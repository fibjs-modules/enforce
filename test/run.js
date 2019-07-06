var path = require('path')
var test = require('test')

test.setup();

var fs       	= require('fs');
var path     	= require('path');
var location 	= path.normalize(path.join(__dirname, "integration"));

fs.readdirSync(location)
	.filter(file => path.extname(file) === '.js')
	.forEach(function (file) {
		var fpath = path.join(location, file)
		run(fpath)
	});

test.run(console.DEBUG);