#!/usr/local/bin/node

/* In order to use shebang on line 1 here, I need to change the permissions on this file to give the User eXecute privileges.

IN TERMINAL:
-------------------
chmod u+x pets.js

NOW, it doesn't matter what the extension is for this file; the terminal will see #! at the top of the file and know to use node for running the code below. How cool! Although definitely less useful outside of Unix.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const node = path.basename(process.argv[0]); // 'node'
const file = path.basename(process.argv[1]); // 'pets.js'
const cmd = process.argv[2]; // 'read'

if (cmd === 'read') {
  var index = process.argv[3]; // '0'

  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) throw err;

    let petsArray = JSON.parse(data);
    let result = petsArray[index];

    // Return the whole array if no index is specified
    if (index === undefined) {
      console.log(petsArray);
      // Throw error if index is out of bounds
    } else if (result === undefined) {
      console.error(`Usage: ${node} ${file} read INDEX`);
      process.exit(1);
    } else {
      console.log(result);;
    }
  })

} else if (cmd === 'create') {

  let newAge = parseInt(process.argv[3]); // 3
  let newKind = process.argv[4]; // 'parakeet'
  let newName = process.argv[5]; // 'Cornflake'

  fs.readFile(petsPath, 'utf8', function(readErr, data) {
    if (readErr) throw readErr;
    if (newAge && newKind && newName) {
      let newPet = { age: newAge, kind: newKind, name: newName};
      let petsArray = JSON.parse(data);
      petsArray.push(newPet);

      let newPetsData = JSON.stringify(petsArray);

      fs.writeFile(petsPath, newPetsData, (writeErr) => {
      if (writeErr) throw writeErr;
      })

      console.log(newPet);

    } else {
      console.error(`Usage: ${node} ${file} create AGE KIND NAME`);
      process.exit(1);
    }
  })
} else if (cmd === 'update') {

  let indexOfPetsData = process.argv[3];
  let newAge = parseInt(process.argv[4]);
  let newKind = process.argv[5];
  let newName = process.argv[6];

  fs.readFile(petsPath, 'utf8', function(readErr, data) {
    if (readErr) throw readErr;
    if (indexOfPetsData && newAge && newKind && newName) {
      let petsArray = JSON.parse(data);
      let petToUpdate = petsArray[indexOfPetsData];
      petToUpdate.age = newAge;
      petToUpdate.kind = newKind;
      petToUpdate.name = newName;

      let newPetsData = JSON.stringify(petsArray);

      fs.writeFile(petsPath, newPetsData, (writeErr) => {
      if (writeErr) throw writeErr;
      })

      console.log(petToUpdate);

    } else {
      console.error(`Usage: ${node} ${file} update INDEX AGE KIND NAME`);
      process.exit(1);
    }

  })
} else if (cmd === 'destroy') {

  let indexOfPetsData = process.argv[3];

  fs.readFile(petsPath, 'utf8', function(readErr, data) {
    if (readErr) throw readErr;
    if (indexOfPetsData) {
      let petsArray = JSON.parse(data);
      let destroyedPet = petsArray[indexOfPetsData];
      petsArray.splice(indexOfPetsData, 1);
      let newPetsData = JSON.stringify(petsArray);

      fs.writeFile(petsPath, newPetsData, (writeErr) => {
      if (writeErr) throw writeErr;
      })

      console.log(destroyedPet);

    } else {
      console.error(`Usage: ${node} ${file} destroy INDEX`);
      process.exit(1);
    }

  })
} else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
