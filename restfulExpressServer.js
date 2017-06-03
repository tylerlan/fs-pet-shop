// const PetsDataStore = require('./PetsDataStore');
// const petsDataStore = new PetsDataStore;

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const express = require('express');
const app = express();
const port = process.env.PORT || 3003;

const bodyParser = require('body-parser');
const morgan = require('morgan');

app.disable('x-powered-by');
app.use(morgan('short'));
app.use(bodyParser.json()); // bodyParser.json() returns a Middleware that enables you to access the body of a request

/* =====================
    READ / RETRIEVE
===================== */

app.get('/pets/:id', retrieve);

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

    res.status(200);
    res.set('content-type', 'application/json');
    res.send(pets[id]);
  });
};

/* =====================
         QUERY
===================== */

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

/* =====================
         CREATE
===================== */



/* =====================
        UPDATE
===================== */



/* =====================
         DELETE
===================== */



/* =====================
     error handler
===================== */

app.use((request, response) => {
  response.sendStatus(404);
});





app.listen(port, () => {
  console.log(`Now listening, to port ${port}`);
});
