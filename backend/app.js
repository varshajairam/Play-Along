require('dotenv').config();
const express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const app = express();
var login_register_handler = require('./login_register_handler');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json({ type: 'application/*+json' }));
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
	res.send("Success");
});
app.get('/logout', login_register_handler.logoutHandler);
app.post('/register', login_register_handler.registerHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
