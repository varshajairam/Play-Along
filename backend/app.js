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

app.post('/login', login_register_handler.loginHandler);
app.post('/register', login_register_handler.registerUserHandler);
app.post('/registergame', login_register_handler.registerGameHandler);



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
