const axios = require('axios');
const SerialPort = require('serialport');
const parsers = SerialPort.parsers;
const rPort = "COM9";
const baseURL = "http://localhost:3003/students"

const parser = new parsers.Readline({
    delimiter: '\n'
});

var receivePort = new SerialPort(rPort,{ 
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

receivePort.pipe(parser);


const express = require("express");
const http = require("http");
const port = process.env.PORT || 4001;
const io = require("socket.io")(port,{
  cors:{
    origin:["http://localhost:3000"]
  }
});
const index = require("./routes/index");
const app = express();
app.use(index);
const server = http.createServer(app);
// const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
let setPresent;
parser.on('data', function(data) {
  console.log(data);
  let customURL = baseURL+`?uid=${String(data)}`
  axios.get(customURL)
  .then(response =>{
    const scannedCard = response.data[0];
    const responseDB = typeof scannedCard == 'object';
    if(responseDB){
      io.emit('newScannedCard',scannedCard);
    }
    setPresent = {...scannedCard,isCurrentlyPresent:true};
  })
  .then(response=>axios.put(baseURL+`/${String(setPresent.id)}`,setPresent))
  .catch(err=>console.log(err));  
  // axios.put(baseURL+String(setPresent.id),setPresent);
  // console.log(setPresent)
  
  
}
)


server.listen(() => console.log(`Listening...`));



