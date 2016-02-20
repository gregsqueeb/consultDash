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
var sp = new SerialPort('/dev/tty.usbserial', { baudrate: 9600, parser: serialport.parsers.readline(parseInt("F0", 16)) });


// LIST ALL SERIAL PORTS AND SOME DATA ABOUT THEM
// serialport.list(function (err, ports) {
//   ports.forEach(function(port) {
//     console.log(port.comName);
//     console.log(port.pnpId);
//     console.log(port.manufacturer);
//   });
// });

sp.on("open", function () {
  console.log('open');
  sp.on('data', function(data) {
    console.log('data received: ' + data);
  });
  sp.write(parseInt("FFFFEF", 16), function(err, results) {
    console.log("results: " + (typeof results));

    // sp.write("5A0B5A015A085A0C5A0D5A035A055A095A135A165A175A1A5A1C5A21F0", function(err,results){
    //   console.log("results2: " + results);
    // });
  });
});

// Server part
var app = express();
var rpm, mph = 0;
app.use('/', express.static(path.join(__dirname, 'public')));

var server = app.listen(8090);
console.log('Server listening on port 8090');

// Socket.IO part
var io = require('socket.io')(server);

io.on('connection', function (socket) {
  console.log('New client connected!');
	//send data to client
    setInterval(function(){
      if(rpm < 7200){
        rpm += 10
      } else{
        rpm = 0
      }
      if(mph < 120){
        mph += 1
      } else{
        mph = 0
      }
      socket.emit('ecuData', {'rpm':rpm,'mph':mph});
    }, 20);
});
