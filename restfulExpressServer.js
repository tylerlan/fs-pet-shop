const express = require('express');
const app = express();
const port = 8000;

const bodyParser = require('body-parser');
const morgan = require('morgan');

app.disable('x-powered-by');
app.use(morgan('short'));
app.use(bodyParser.json()); // bodyParser.json() returns a Middleware that enables you to access the body of a request

app.listen(port, () => {
  console.log(`Now listening, to port ${port}`);
});
