'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const node = path.basename(process.argv[0]); // 'node'
const file = path.basename(process.argv[1]); // 'pets.js'
const cmd = process.argv[2]; // 'read'

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
  var index = process.argv[3]; // '0'

  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) throw err;

    let pets = JSON.parse(data);
    let result = pets[index];

    // Return the whole array if no index is specified
    if (index === undefined) {
      console.log(pets);
      // Throw error if index is out of bounds
    } else if (result === undefined) {
      console.error(`Usage: ${node} ${file} read INDEX`);
      process.exit(1);
    } else {
      console.log(result);;
    }
  })

} else if (cmd === 'create') {

  var newAge = parseInt(process.argv[3]); // 3
  var newKind = process.argv[4]; // 'parakeet'
  var newName = process.argv[5]; // 'Cornflake'

  fs.readFile(petsPath, 'utf8', function(readErr, data) {

    if (readErr) throw readErr;

    if (newAge && newKind && newName) {
      let newPet = { age: newAge, kind: newKind, name: newName};

      let pets = JSON.parse(data);

      pets.push(newPet);

      let newPetsData = JSON.stringify(pets);

      fs.writeFile(petsPath, newPetsData, (writeErr) => {
      if (writeErr) throw writeErr;
      })

      console.log(newPet);

    } else {
      console.error(`Usage: ${node} ${file} create AGE KIND NAME`);
      process.exit(1);
    }
  })
} else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
