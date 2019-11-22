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

async function registerGameHandler(req, res){
	var x;
	var game = (req.body.game).split(',');
	var level = (req.body.level).split(',');
	for (x=0 ; x<game.length; x++) {
		const query2 = "select id from games_enum where name= '"+game[x]+"'";
		const query3 = "select id from skill_level_enum where level= '"+level[x]+"'";
		const query5 = "select id from user where email='"+req.body.email+"'";
		let result_game = await mysql_helper.executeQuery(query2, null);
		let result_skill = await mysql_helper.executeQuery(query3, null);
		let result_user = await mysql_helper.executeQuery(query5, null);
		const query4 = "INSERT INTO user_skills(user_id, game_id, skill_id) VALUES ("+result_user[0]['id']+", "+result_game[0]['id']+", "+result_skill[0]['id']+")";
		await mysql_helper.executeQuer(query4, null);
	}
	res.send("done");
}

function loginHandler(username, password, done) {
	const query = "select * from user where email = ?";
	const args = [username];
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
	logoutHandler: logoutHandler,
	serializeUser: serializeUser,
	deserializeUser: deserializeUser
}
