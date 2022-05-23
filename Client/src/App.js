import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Students from "./Components/Students.js"
import axios from "axios";
import './index.css'
const ENDPOINT = "http://localhost:4001";
const baseURL = "http://localhost:3003/students";


const App = () => {
  const [recentScanned,setRecentScanned] = useState(undefined)
  const [students,setStudents] = useState([])
  const [cleared,setCleared] = useState(students)

  const exportToXsl = () =>{
    console.log("Working");
}
  const clearAllPresence = () =>{
      setCleared(
        students.forEach(student=>student.isCurrentlyPresent = false)
      )
}
  console.log(students);
  useEffect(()=>{
    //getting the data emitted by the server which contains the scanned card student info
    const socket = socketIOClient(ENDPOINT);
    // console.log("socket : ",socket)
    socket.on("newScannedCard", data => {
      setRecentScanned(data);
      // console.log(data);
    });
    //getting the students from the database
    axios
    .get(baseURL)
    .then(response=>{setStudents(response.data)})
    .catch(err=>console.log(err))
},[])
  //console.log("recent scanned ",recentScanned)
  //console.log("students : ",students)
  
  //when recentScanned type becomes an object means that there was a scanned card info coming from the server
  //we change it's "isCurrentlyPresent" property to true.
  if(typeof recentScanned === "object") {
    // console.log("here");
    var studentToChange = students.find(student=>student.id === recentScanned.id)
    studentToChange.isCurrentlyPresent = "True";
    // console.log("after : ",students)

  }
  return (
    <div className="container">
    <Students students = {students}/>
    <div className="control-buttons">
        <button className="btn" onClick={clearAllPresence} >Clear All</button>
        <button className="btn" onClick={exportToXsl} >Export</button>
      </div>
    </div>
  );
}

export default App;