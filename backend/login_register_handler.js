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

function loginHandler(req, res) {
	res.send("Hello World");  
}

async function registerUserHandler(req, res) {
		const query = "INSERT INTO user ( name, email, password, is_admin, dob, mobile,country, zipcode) VALUES ('"+req.body.name+"','"+req.body.email+"','"+req.body.password+"',"+req.body.is_admin+", '"+req.body.dob+"',"+req.body.mobile+", '"+req.body.country+"',"+req.body.zipcode+")";
		await queryHandler(query);
		
		res.send("insert done");
}

async function registerGameHandler(req, res){
	var x;
	var game = (req.body.game).split(',');
	var level = (req.body.level).split(',');
	for (x=0 ; x<game.length; x++){
	const query2 = "select id from games_enum where name= '"+game[x]+"'";
	const query3 = "select id from skill_level_enum where level= '"+level[x]+"'";
	const query5 = "select id from user where email='"+req.body.email+"'";
	let result_game = await queryHandler(query2);
	let result_skill = await queryHandler(query3);
	let result_user = await queryHandler(query5);
	const query4 = "INSERT INTO user_skills(user_id, game_id, skill_id) VALUES ("+result_user[0]['id']+", "+result_game[0]['id']+", "+result_skill[0]['id']+")";
	await queryHandler(query4);
		
	}
	res.send("done");
}

module.exports = {
	loginHandler: loginHandler,
	registerUserHandler: registerUserHandler,
	registerGameHandler: registerGameHandler

}