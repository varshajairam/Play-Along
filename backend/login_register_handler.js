var mysql_helper = require('./mysql_helper');
const bcrypt = require('bcrypt');

function registerUserHandler(req, res) {
	var dob = req.body.dob.split('T')[0];
	const query = "INSERT INTO user (name, email, password, is_admin, dob, mobile, country, zipcode) VALUES ?";
	bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
		const values = [[[req.body.name, req.body.email, hashedPass, false, dob, req.body.mobile, req.body.country, req.body.zipcode]]];
		mysql_helper.executeQuery(query, values).then((result) => {
			res.send("Success");
		});
	});
}

function registerGameCall(req, res){
	const query = "SELECT * FROM games_enum";
	mysql_helper.executeQuery(query, []).then((result) => {
			res.send(result);
		});
}

function registerSkillCall(req, res){
	const query = "SELECT * FROM skill_level_enum";
	mysql_helper.executeQuery(query, []).then((result) => {
			res.send(result);
		});
}

function registerGameHandler(req, res){
	
	size = game_id.length;
	for (var i =0; i < size; i++){
	const query = "INSERT INTO user_skills(user_id, game_id, skill_id) VALUES ?";
	const values = [[[req.body.user_id, req.body.game_id, req.body.skill_id]]];
	mysql_helper.executeQuery(query, values).then((result) => {
			res.send("done");
	});
	}
	
}

function loginHandler(req, username, password, done) {
	const is_admin = (req.body.is_admin == 'true');
	const query = "select * from user where email = ? and is_admin = ?";
	const args = [username, is_admin];
	mysql_helper.executeQuery(query, args).then((result) => {
		if (!result.length) return done(null, false, { message: 'Incorrect username or password.' });
		const hashed_pass = result[0].password;
		bcrypt.compare(password, hashed_pass, function(err, res) {
			if (err || !res) return done(null, false, { message: 'Incorrect username or password.' });
			return done(null, result[0]);
		});
	});
}

function serializeUser(user, done) {
	done(null, user.id);
}

function deserializeUser(id, done) {
	const query = "select * from user where id = ?";
	const args = [id];
	mysql_helper.executeQuery(query, args).then((result) => {
		done(null, result[0]);
	});
}

function logoutHandler(req, res) {
	req.logout();
	res.send("Success");
}

module.exports = {
	loginHandler: loginHandler,
	registerUserHandler: registerUserHandler,
	registerGameHandler: registerGameHandler,
	registerGameCall: registerGameCall,
	registerSkillCall: registerSkillCall,
	logoutHandler: logoutHandler,
	serializeUser: serializeUser,
	deserializeUser: deserializeUser
}
