'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const express = require('express');
const app = express();
const port = process.env.PORT || 3003;

const bodyParser = require('body-parser');

/* ======================= GETTING ======================================= */

app.get('/pets', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var pets = JSON.parse(petsJSON);

    res.send(pets);
  });
});

app.get('/pets/:id', function(req, res) {

  if (req.params.id === undefined) ;

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

    res.status(200);
    res.set('content-type', 'application/json');
    res.send(pets[id]);
  });
});

/* ======================= POSTING ======================================= */

app.use(bodyParser.json()); // bodyParser.json() returns a Middleware that enables you to access the body of a request

app.post('/pets', function(req, res) {
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

      res.set('Content-Type', 'application/json');
      res.send(newPet);
    });
  });
});

// catch-all route handler
app.use(function(req, res) {
  // res.set('Content-Type', 'text/plain');
  res.sendStatus(404);
});


/* ======================= LISTENING ======================================= */
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

module.exports = app;
