require('dotenv').config();
const express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const app = express();
var login_register_handler = require('./login_register_handler');
const port = 3000;
const sql = require('mysql')

app.use(bodyParser.urlencoded({ extended: false }));
var home_handler = require('./home_handler');
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

app.use((req, res, next) => {
  	res.header('Access-Control-Allow-Origin', '*');
	// Website you wish to allow to connect
	res.header('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.header('Access-Control-Allow-Credentials', true);
  	next();
});

app.post('/login', passport.authenticate('local'), function(req, res) {
	res.send("Success");
});
app.get('/logout', login_register_handler.logoutHandler);
app.get('/getGames',home_handler.getGamesHandler);
app.post('/register', login_register_handler.registerUserHandler);
app.post('/registergame', login_register_handler.registerGameHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
