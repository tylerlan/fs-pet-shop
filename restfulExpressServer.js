const controllers = require('./controllers.js'); // The place where functions are stored.

const express = require('express');
const app = express();
const port = process.env.PORT || 3003;

const bodyParser = require('body-parser');
const morgan = require('morgan');

app.disable('x-powered-by');
app.use(morgan('short'));
app.use(bodyParser.json());

/* =====================
    READ / RETRIEVE
===================== */

app.get('/pets/:id', controllers.retrieve);

/* =====================
         QUERY
===================== */

app.get('/pets', controllers.query);

/* =====================
         CREATE
===================== */

app.post('/pets', controllers.create);

/* =====================
        UPDATE
===================== */

app.patch('/pets/:id', controllers.update);

/* =====================
         DELETE
===================== */

app.delete('/pets/:id', controllers.deletePet);

/* =====================
     error handler
===================== */

app.use((request, response) => {
  response.sendStatus(404);
});

/* =====================
       listener
===================== */

app.listen(port, () => {
  console.log(`Now listening, to port ${port}`);
});

module.exports = app;
