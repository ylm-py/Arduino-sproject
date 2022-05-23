import React, { useState } from "react"
import { FaCheck,FaTimes } from "react-icons/fa";


const Student = (props) =>{
    const {students} = props
    
    return(
        <div>
        <table className="students-container">
            <thead>
            <tr>
                <th>Picture</th>
                <th>Full name</th>
                <th>UID</th>
                <th>Present</th>
            </tr>
            </thead>
            <tbody>
                {students.map(student =>
                <tr key = {student.id}>
                    <td>
                        <img className="profile-picture" src={require(`./media/assets/${student.profilePicture}.png`)} alt = "student-profile"></img>
                    </td>
                    <td>
                        <p>{student.name} {student.lastName}</p>
                    </td>
                    <td>
                        <p>{student.uid}</p>
                    </td>
                    <td>
                        {student.isCurrentlyPresent ? 
                            <FaCheck style = {{color:"green",fontSize:"50px"}}/>:
                            <FaTimes style = {{color:"red",fontSize:"50px"}}/>
                        }
                    </td>
                </tr>
                
                
                )}
        </tbody>
      </table>
      
        </div>
    )
}

export default Student;

