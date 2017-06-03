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
    var id = Number.parseInt(req.params.id);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.set('content-type', 'text/plain').sendStatus(404);
    }

    res.status(200).set('content-type', 'application/json');
    res.send(pets[id]);
  });
};

// function update (req, res) {
  const changes = req.body;
}

// function delete (req, res) {
//
// }

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
}


module.exports = {
  retrieve: retrieve,
  query: query,
  create: create
}
