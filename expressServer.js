'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const express = require('express');
const app = express();
const port = process.env.PORT || 3003;

app.disable('x-powered-by');

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

    var id = Number.parseInt(req.params.id);
    var pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.set('Content-Type', 'text/plain').sendStatus(404);
    }

    res.status(200);
    res.set('Content-Type', 'application/json');
    res.send(pets[id]);
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

/*
REQ_______________________________
http GET localhost:3003/pets

    RES ========================================
    200
    application/json
    [{ "age": 7, "kind": "rainbow", "name": "fido" }, { "age": 5, "kind": "snake", "name": "Buttons" }]

REQ_______________________________
http GET localhost:3003/pets/0

    RES ========================================
    200
    application/json
    { "age": 7, "kind": "rainbow", "name": "fido" }

REQ_______________________________
http GET localhost:3003/pets/1

    RES ========================================
    200
    application/json
    { "age": 5, "kind": "snake", "name": "Buttons" }

REQ_______________________________
http GET localhost:3003/pets/2

    RES ========================================
    404
    text/plain
    Not Found

REQ_______________________________
http GET localhost:3003/pets/-1

    RES ========================================
    404
    text/plain
    Not Found
*/





module.exports = app;
