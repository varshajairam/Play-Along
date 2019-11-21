require('dotenv').config();
const express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
const sql = require('mysql')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');

var login_register_handler = require('./login_register_handler');
var home_handler = require('./home_handler');

const app = express();
const port = 3000;

app.use(cors({
	origin: ["http://localhost:8100"],
	credentials: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	secret: 'keyboard cat',
  	resave: false,
  	saveUninitialized: true,
	cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(login_register_handler.loginHandler));
passport.serializeUser(login_register_handler.serializeUser);
passport.deserializeUser(login_register_handler.deserializeUser);

app.post('/login', passport.authenticate('local'), function(req, res) {
	res.send({status: "Success"});
});
app.get('/logout', login_register_handler.logoutHandler);
app.get('/getGames',home_handler.getGamesHandler);
app.post('/register', login_register_handler.registerUserHandler);
app.post('/registergame', login_register_handler.registerGameHandler);
app.post('/testlogin', (req, res) => {
	console.log(req.user);
	res.json({status: "Success"});
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
