var mysql_helper = require('./mysql_helper');

function get_all_users(req, res) {
	const query = "select name, email, is_blocked from user where is_admin = false";
	mysql_helper.executeQuery(query, []).then((result) => {
		res.send(result);
	});
}

function get_all_games(req, res) {
	const query = "select id, name from games_enum";
	mysql_helper.executeQuery(query, []).then((result) => {
		res.send(result);
	})
}

function get_all_skills(req, res) {
	const query = "select id, level from skill_level_enum";
	mysql_helper.executeQuery(query, []).then((result) => {
		res.send(result);
	})
}

function update_user_status(req, res) {
	const blocked = (req.body.is_blocked == 'true');
	const query = "update user set is_blocked = ? where email = ?";
	mysql_helper.executeQuery(query, [blocked, req.body.email]).then(() => {
		res.send({status: "Success"});
	});
}

function insert_game(req, res) {
	const query = "insert into games_enum (name) values ?";
	const args = [[[req.body.name]]];
	mysql_helper.executeQuery(query, args).then(() => {
		res.send({status: "Success"});
	});
}

function insert_skill(req, res) {
	const query = "insert into skill_level_enum (level) values ?";
	const args = [[[req.body.name]]];
	mysql_helper.executeQuery(query, args).then(() => {
		res.send({status: "Success"});
	});
}

function get_active_complaints(req, res) {
	const query = `select c.id, c.title, c.description, u.name as made_by from complaints c
	inner join user u on u.id = c.made_by
	where c.status != 3`;
	mysql_helper.executeQuery(query, []).then((result) => {
		res.send(result);
	});
}

function resolve_complaints(req, res) {
	const query = "update complaints set status = 3, reviewed_by = ?, reviewed_on = now(), review_message = ? where id = ?";
	const args = [req.user.id, req.body.review_message, req.body.complaint_id];
	mysql_helper.executeQuery(query, args).then((result) => {
		res.send({status: "Success"});
	});
}

module.exports = {
	get_all_users: get_all_users,
	update_user_status: update_user_status,
	get_all_games: get_all_games,
	get_all_skills: get_all_skills,
	insert_game: insert_game,
	insert_skill: insert_skill,
	get_active_complaints: get_active_complaints,
	resolve_complaints: resolve_complaints
}