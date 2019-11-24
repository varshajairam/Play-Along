var mysql_helper = require('./mysql_helper');

function get_all_users(req, res) {
	const query = "select name, email, is_blocked from user where is_admin = false";
	mysql_helper.executeQuery(query, []).then((result) => {
		res.send(result);
	});
}

function update_user_status(req, res) {
	const blocked = (req.body.is_blocked == 'true');
	const query = "update user set is_blocked = ? where email = ?";
	mysql_helper.executeQuery(query, [blocked, req.body.email]).then(() => {
		res.send({status: "Success"});
	});
}

module.exports = {
	get_all_users: get_all_users,
	update_user_status: update_user_status
}