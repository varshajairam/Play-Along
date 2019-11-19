require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const sql = require('mysql')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var login_register_handler = require('./login_register_handler');
var class_creation_handler = require('./class_creation_handler');

app.post('/login', login_register_handler.loginHandler);
app.post('/register', login_register_handler.registerUserHandler);
app.post('/registergame', login_register_handler.registerGameHandler);
app.post('/classcreate', class_creation_handler.createClass);
app.post('/classenrollment', class_creation_handler.classEnrollment);
app.post('/classschedule', class_creation_handler.classschedule);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
