const mysql = require('mysql');

const con = mysql.createConnection({
  			host: "localhost",
  			user: "root",
  			password: "password",
  			database : "PlayAlong"
			});

function q(con, sqlquery){
	console.log(sqlquery)
 
  	
}
 
function queryHandler(sqlquery)
{
	//result = q(con,sqlquery);
	return new Promise((resolve, reject) => {
		con.query(sqlquery, function (err, result, fields) {
		    if (err){
		    	console.error(err);
		    	reject(err);
		    }
			else if(result){
				resolve(result);
			}
		});

	});
	
}

async function createClass(req, res) {

		const query1 = "select id from games_enum where name= '"+req.body.game+"'";
		let result_game = await queryHandler(query1);
		const query = "INSERT INTO class(game_type_id, name, created_on, players_count, cost, city, country, zipcode, created_by, instructor_id) VALUES ("+result_game[0]['id']+",'"+req.body.name+"','"+req.body.date+"','"+req.body.count+"',"+req.body.cost+", '"+req.body.city+"','"+req.body.country+"',"+req.body.zipcode+", '"+req.body.created_by_id+"', '"+req.body.instructor_id+"')";
		await queryHandler(query);
		
		res.send("insert done");
}

async function classEnrollment(req, res) {
		const query = "INSERT INTO class_enrollment(class_id, user_id) VALUES ("+req.body.class_id+","+req.body.user_id+")";
		await queryHandler(query);
		
		res.send("insert done");
}

async function classSchedule(req, res) {

		const query1 = "select id from day_enum where name= '"+req.body.day+"'";
		let result_day = await queryHandler(query1);
		const query = "INSERT INTO class_schedule(class_id, day, start_time, end_time) VALUES ("+req.body.class_id+","+result_day[0]['id']+", '"+req.body.start_time+"', '"+req.body.end_time+"')";
		await queryHandler(query);
		
		res.send("insert done");
}

Module.exports = {
	createClass: createClass,
	classEnrollment: classEnrollment,
	classSchedule: classSchedule

	
}