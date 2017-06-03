'use strict';

const controllers = require('./controllers.js'); // The place where functions are stored.

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

/* ========= OPERATIONS =============== */

app.get('/pets', controllers.query);
app.get('/pets/:id', controllers.retrieve);
app.post('/pets', controllers.create);

app.use(function(req, res) {
  res.sendStatus(404);
});

/* ========= LISTENING ========== */
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

module.exports = app;
