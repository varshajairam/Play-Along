function loginHandler(username, password, done) {
	if(username == "test" && password == "test")
		return done(null, {username: "test"})
	return done(null, false, { message: 'Incorrect username or password.' });
}

function serializeUser(user, done) {
	done(null, 1)
}

function deserializeUser(id, done) {
	done(null, {username: "test"})
}

function logoutHandler(req, res) {
	req.logout();
	res.send("Success");
}

function registerHandler(req, res) {
	res.send("Hello World");
}

module.exports = {
	loginHandler: loginHandler,
	logoutHandler: logoutHandler,
	registerHandler: registerHandler,
	serializeUser: serializeUser,
	deserializeUser: deserializeUser
}