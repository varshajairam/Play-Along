require('dotenv').config();
const express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
const sql = require('mysql');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');

var login_register_handler = require('./login_register_handler');
var home_handler = require('./home_handler');
var create_game_handler = require('./create_game_handler');
var admin_handler = require('./admin_handler');
const app = express();
const port = 3000;

app.use(cors({
	origin: ["http://localhost:8100"],
	credentials: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
var enroll_handler=require('./enroll_handler');
app.use(session({
	secret: 'keyboard cat',
  	resave: false,
  	saveUninitialized: true,
	cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
	usernameField: 'username', 
	passwordField: 'password', 
	passReqToCallback: true
}, login_register_handler.loginHandler));
passport.serializeUser(login_register_handler.serializeUser);
passport.deserializeUser(login_register_handler.deserializeUser);

app.get('/user_logged_in', function(req, res) { res.send({logged_in: req.user ? true : false}) });
app.post('/login', passport.authenticate('local'), function(req, res) {
	res.send({status: "Success"});
});
app.get('/logout', login_register_handler.logoutHandler);
app.get('/getGames',home_handler.getGamesHandler);
app.post('/enrollGame',enroll_handler.enrollGamesHandler);
app.post('/register', login_register_handler.registerUserHandler);
app.get('/registergamecall', login_register_handler.registerGameCall);
app.get('/registerskillcall', login_register_handler.registerSkillCall);
app.post('/registergamehandler', login_register_handler.registerGameHandler);
app.post('/game', create_game_handler.createGameHandler);
app.post('/testlogin', (req, res) => {
	console.log(req.user);
	res.json({status: "Success"});
});

app.post('/getAllUsers', admin_handler.get_all_users);
app.post('/updateUserStatus', admin_handler.update_user_status);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
