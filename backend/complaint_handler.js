var mysql_helper = require('./mysql_helper');

function make_complaint(req, res) {
	const query = "insert into complaints (title, description, status, made_by, made_on) values ?";
	const args = [[[req.body.title, req.body.description, 1, req.user.id, (new Date())]]];
	mysql_helper.executeQuery(query, args).then(() => {
		res.send({status: "Success"});
	});
}

module.exports = {
	make_complaint: make_complaint
}