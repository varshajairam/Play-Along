const mysql = require('mysql');
const con = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database : process.env.MYSQL_DATABASE
});

function executeQuery(query, args) {
	return new Promise((resolve, reject) => {
		
		con.query(query, args, function(err, result) {
			if (err) reject(err);
			resolve(result);
		});
	});
}

module.exports = {
	executeQuery: executeQuery
}
