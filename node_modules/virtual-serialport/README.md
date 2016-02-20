#About this repo:

This is an exact copy of the last code in https://github.com/freshdried/virtual-serialport.git, which is now deleted and we don't know why.
We made this copy and also published the npm package because we were using this module in several projects.


# virtual-serialport
Do you use [node-serialport](https://github.com/voodootikigod/node-serialport), but don't have your device connected for development or testing?

virtual-serialport provides a virtual drop-in replacement for an actual SerialPort object.

<br><br><br>
## examples
```javascript
var SerialPort = require('node-serialport').SerialPort;
if (process.env.NODE_ENV == 'development') {
  SerialPort = require('virtual-serialport');
}

var sp = new SerialPort('/dev/ttyUSB0', { baudrate: 57600 }); // still works if NODE_ENV is set to development!

sp.on('open', function (err) {
  sp.on("data", function(data) {
    console.log("From Arduino: " + data);
  });


  if (process.env.NODE_ENV == 'development') {
    sp.on("dataToDevice", function(data) {
      sp.writeToComputer(data + " " + data + "!");
    });
  }

  sp.write("BLOOP"); // "From Arduino: BLOOP BLOOP!"
}
```

<br><br><br>

## usage
```javascript
var VirtualSerialPort = require('virtual-serialport');
```

#### sp = new VirtualSerialPort(path, [opts={}])
instantiates a virtual SerialPort object. Currently does nothing with the parameters.

```javascript
sp = new VirtualSerialPort("/dev/ttyUSB0");
// No device has to actually exist at /dev/ttyUSB0 :)
```

### computer-to-device communication

```javascript
sp.on("data", function(data) {
	console.log("Computer says, " + data);
});

sp.writeToComputer("BLEEP!"); // "Computer says, BLEEP!"
```

### device-to-computer communication

```javascript
sp.on("dataToDevice", function(data) {
	console.log("Arduino says, " + data):
});

sp.write("BLOOP!"); // "Arduino says, BLOOP!"
```

### node-serialport methods/events:
#### sp.write(data)
Writes data to the virtual device.
Equivalent to `sp.emit("dataToDevice", data)`.

### sp.on("open", function(err) { ... } )
Runs function once SerialPort is ready, as you would with an actual SerialPort instance.


### sp.on("data", function(data) { ... })
Act on data sent to the computer, as you would with an actual SerialPort instance.

### non node-serialport methods/events:
#### sp.writeToComputer(data);
Writes data to computer.
Equivalent to `sp.emit("data", data)`


#### sp.on("dataToDevice", function(data) { ... })
Act on data sent to the device.

<br><br><br>
## todo
- move to automated testing (assertions and more)
- better match voodootikigod's node-serialport api
