#!/usr/bin/env node

var module = require('../index.js');
var program = require('commander');

program
	.command('publish [options]')
	.description('publish the contents of .\\bin\\stage to the current version\'s GitHub release')
	.option("-r, --release", "publish immediately, do not create draft")
	.action(function(cmd, options){
		var opts = {},
			x = new module();
		opts.draft = options.release ? false : true;
		x.publish(opts);
	});

program
	.command('help','',{isDefault: true, noHelp: true})
	.action(function() {
		console.log();
		console.log('Usage: node-pre-gyp-github publish');
		console.log();
		console.log('publish the contents of .\\bin\\stage to the current version\'s GitHub release');
	});

program.parse(process.argv);

if (!program.args.length) {
	program.help();
}
