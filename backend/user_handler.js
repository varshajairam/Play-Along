var mysql_helper = require('./mysql_helper');

function get_user_details(req, res) {
	const user_obj = {
		name: req.user.name,
		email: req.user.email,
		zipcode: req.user.zipcode
	}
	res.send(user_obj);
}

module.exports = {
	get_user_details: get_user_details
}