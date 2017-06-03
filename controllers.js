const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

/* ====================================================== */

function create (req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var petsArray = JSON.parse(petsJSON);
    var petName = req.body.name;
    var petKind = req.body.kind;
    var petAge = parseInt(req.body.age);

    if (!petName || !petKind || !petAge) {
      return res.sendStatus(400);
    }

    let newPet = {age:petAge, kind: petKind, name:petName};

    petsArray.push(newPet);

    var newPetsJSON = JSON.stringify(petsArray);

    fs.writeFile(petsPath, newPetsJSON, function(err) {
      if (err) {
        console.error(err.stack);
        return res.sendStatus(500);
      }

      res.status(200).set('content-type', 'application/json');
      res.send(newPet);
    });
  });
}

function retrieve (req, res) {

  if (!req.params.id) return; // silent fail

  fs.readFile(petsPath, 'utf8', function(err, petsJSON){
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var pets = JSON.parse(petsJSON);
    var index = Number.parseInt(req.params.id);

    if (index < 0 || index >= pets.length || Number.isNaN(index)) {
      return res.set('content-type', 'text/plain').sendStatus(404);
    }

    res.status(200).set('content-type', 'application/json');
    res.send(pets[index]);
  });
};

function update(req, res) {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    const index = Number.parseInt(req.params.id);
    const pets = JSON.parse(petsJSON);

    if (index < 0 || index >= pets.length || Number.isNaN(index)) {
      return res.sendStatus(404);
    }

    const changes = req.body;
    const age = Number.parseInt(changes.age);

    var pet = pets[index];
    updatedPet = Object.assign({}, pet, changes);
    pets[index] = updatedPet;

    const newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON, (err) => {
      if (err) {
        return next(err);
      }

      res.send(updatedPet);
    });
  });
};

function Delete (req, res) {
  return;
}

function query (req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var pets = JSON.parse(petsJSON);

    res.status(200).set('content-type', 'application/json');
    res.send(pets);
  });
};

module.exports = {
  retrieve: retrieve,
  query: query,
  create: create,
  update: update,
  delete: Delete
}




























//
