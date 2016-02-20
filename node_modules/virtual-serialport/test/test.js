var VirtualSerialPort = require('../');

var sp = new VirtualSerialPort('/dev/null');

// Simple echo function for fake Arduino
sp.on('dataToDevice', function(data) {
	console.log("Arduino: " + (data == 1 ? "BLEEP" : "BLOOP"));
	sp.writeToComputer(data^1);
});

sp.on('open', function() {
	console.log("Initialized virtual serial port!");

	setInterval(function() {
		sp.write(Math.floor(Math.random() * 2));
	}, 1000);

	sp.on("data", function(data) {
		console.log("Computer: " + (data == 1 ? "BLEEP" : "BLOOP"));
	});
});
