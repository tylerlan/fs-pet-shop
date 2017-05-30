'use strict';

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var node = path.basename(process.argv[0]); // 'node'
var file = path.basename(process.argv[1]); // 'pets.js'
var cmd = process.argv[2]; // 'read'
var index = process.argv[3]; // '0'

/*
IN TERMINAL:
-------------------------------
node pets.js read 0

IN JS:
-------------------------------
process.argv[0] === 'node'
process.argv[1] === 'pets.js'
process.argv[2] === 'read'
process.argv[3] === '0'
*/

if (cmd === 'read') {
  console.log(typeof index);
  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    var pets = JSON.parse(data);

    console.log(pets[index]);
  });
}
else {
  console.error(`Usage: ${node} ${file} read`);
  process.exit(1);
}
