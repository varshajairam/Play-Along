function loginHandler(req, res) {
	res.send("Hello World");
}

function registerHandler(req, res) {
	res.send("Hello World");
}

function getGamesHandler(req,res){
	var zipcode=req.query.zipcode;
	var dbConnection = require('./db_connectio.js');
	var sql="select * from playalong.games where zipcode=" + zipcode +";"

	var sql=`SELECT id,game_type_id,name,DATE_FORMAT(DATE, '%Y-%m-%d') as date,players_count,cost,
   CONCAT
    ("{",
      'apt:', '"', coalesce(apt,"")   , '"', ',' 
      'street:', '"', street, '"', ','
	  'city:', '"', city, '"', ','
	   'country:', '"', country, '"', ','
      'zipcode:'  , zipcode ,"}"
    ) AS address,created_by,DATE_FORMAT(created_on, '%Y-%m-%d') as created_on,owner_id
  FROM playalong.games where zipcode=`+zipcode+";"

	//dbConnection.functionSelect(sql);
 	res.send(dbConnection.functionSelect(sql));
}

module.exports = {
	loginHandler: loginHandler,
	registerHandler: registerHandler,
	getGamesHandler:getGamesHandler
}
