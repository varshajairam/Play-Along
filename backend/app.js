require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

var login_register_handler = require('./login_register_handler');
var home_handler = require('./home_handler');

app.post('/login', login_register_handler.loginHandler);
app.post('/register', login_register_handler.registerHandler);
app.get('/getGames',home_handler.getGamesHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
