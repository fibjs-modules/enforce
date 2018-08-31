// var mocha 		= require('./_mocha')
var test = require('test')

test.setup();

var fs       	= require('fs');
var path     	= require('path');
var location 	= path.normalize(path.join(__dirname, "integration"));

fs.readdirSync(location).filter(function (file) {
	return file.substr(-3) === '.js';
}).forEach(function (file) {
	var fpath = path.join(location, file)

	console.log('fpath', fpath)
	run(fpath)
});

test.run(console.DEBUG);