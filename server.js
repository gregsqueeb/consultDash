var PATH_TO_SERIAL_PORT = '';
var path = require('path');
var fs = require('fs');
var express = require('express');
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
// var SerialPort = require('virtual-serialport');
// if (process.env.NODE_ENV == 'development') {
//   console.log('Virtual Serial Port Activated');
//   SerialPort = require('virtual-serialport');
// }
var sp = new SerialPort('/dev/tty.usbserial', { baudrate: 9600 });
var rpm, mph = 0;

var currentData= [];
var frameStarted = false;
var lengthByte;
function handleData(data, bytesExpected){
  // create an array of the size of requested data length and fill with requested data
  for(var i = 0; i < data.length; i++){
    // read just 1 byte at a time of the stream
    var char = data.toString('hex',i,i+1);
    if(char === "ff"){
      // Beginning of data array, the frame has started
      frameStarted = true;
      // Get rid of last frame of data
      currentData = [];
      // remove last lengthByte number so that we can check what this frame's byte should be
      lengthByte = undefined;
    }else if(frameStarted){
      // frame has started
      if(!lengthByte){
        // read lengthByte from the ECU
        lengthByte = parseInt(char, 16);
      }else{
        // push byte of data onto our array
        currentData.push(parseInt(char, 16));
      }
    }
  }
  if(currentData.length === bytesExpected){
    // End of data, return the array of data
    frameStarted = false;
    return currentData.slice();
  }
}

function convertRPM(mostSignificantBit, leastSignificantBit){
  // combine most significant bit and least significant bit and convert to RPM
  return ((mostSignificantBit << 8) + leastSignificantBit) * 12.5
}

function parseData(data){

  if(data !== undefined){
    var dataRPM = convertRPM(data[1], data[2])
    rpm = dataRPM
  }

}

var isConnected = false;
var command = [0x5A,0x08,0x5A,0x00,0x5A,0x01,0xF0];
var bytesRequested = (command.length - 1) / 2;
sp.on("open", function () {
  // Write initialization bytes to the ECU
  sp.write([0xFF, 0xFF, 0xEF], function(err, results) {});
  sp.on('data', function(data) {
    // Check to see if the ECU is connected and has sent the connection confirmation byte "10"
    if(!isConnected && data.toString('hex') === "10"){
      console.log("connected");
      isConnected = true;
      // Tell the ECU what data we want it to give us
      sp.write(command, function(err,results){});
    }else{
      // Read the data from the stream and parse it
      parseData(handleData(data, bytesRequested));
    }
  });
});

// Server part
var app = express();

app.use('/', express.static(path.join(__dirname, 'public')));

var server = app.listen(8090);
console.log('Server listening on port 8090');

// Socket.IO part
var io = require('socket.io')(server);

io.on('connection', function (socket) {
  console.log('New client connected!');
    //send data to client
    setInterval(function(){
      if(mph < 120){
        mph += 1
      } else{
        mph = 0
      }
      socket.emit('ecuData', {'rpm':rpm,'mph':mph});
    }, 20);
});
