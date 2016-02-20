var events = require('events');
var util = require('util');

var VirtualSerialPort = function(path, options){
	events.EventEmitter.call(this);

	var self = this;
	var open = false;


	this.write = function(data) {
		if (open) self.emit("dataToDevice", data);
	};

	this.writeToComputer = function(data) {
		self.emit("data", data);
	};

	setTimeout(function(){
		open = true;
		self.emit("open");
	}, 100);
}
util.inherits(VirtualSerialPort, events.EventEmitter);

module.exports = VirtualSerialPort;
