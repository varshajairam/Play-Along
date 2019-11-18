function loginHandler(req, res) {
	res.send("Hello World");
}

function registerHandler(req, res) {
	res.send("Hello World");
}

function getGamesHandler(req,res){
	 //var dbConnection = require('./db_connectio.js');
	var zipcode=req.query.zipcode;
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

	getResult(sql, function(result){
		var dbConnection = require('./db_connectio.js');
		//console.log(result);
		(async()=>{

			var car=await dbConnection.functionSelect(sql);
		res.send(car);
		})()
		//res.send("hello");
	});
}

function getResult(sql, callback){
	getSQLResult(sql, function(sql){
	//	var zipcode=req.query.zipcode;
        //var dbConnection = require('./db_connectio.js');
        //var sql="select * from playalong.games where zipcode=" + zipcode +";"

/*        var sql=`SELECT id,game_type_id,name,DATE_FORMAT(DATE, '%Y-%m-%d') as date,players_count,cost,
   CONCAT
    ("{",
      'apt:', '"', coalesce(apt,"")   , '"', ','
      'street:', '"', street, '"', ','
          'city:', '"', city, '"', ','
           'country:', '"', country, '"', ','
      'zipcode:'  , zipcode ,"}"
    ) AS address,created_by,DATE_FORMAT(created_on, '%Y-%m-%d') as created_on,owner_id
  FROM playalong.games where zipcode=`+zipcode+";" */

        //dbConnection.functionSelect(sql);
//        res.send(dbConnection.functionSelect(sql));


		callback(sql);
	});
}

function getSQLResult(sql, callback){
	callback(sql);
}
//var zipcode=req.query.zipcode;
//	var dbConnection = require('./db_connectio.js');
//	var sql="select * from playalong.games where zipcode=" + zipcode +";"

//	var sql=`SELECT id,game_type_id,name,DATE_FORMAT(DATE, '%Y-%m-%d') as date,players_count,cost,
/*
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
 //res.send(dbConnection.functionSelect(sql));
//
*/
module.exports = {
	loginHandler: loginHandler,
	registerHandler: registerHandler,
	getGamesHandler:getGamesHandler
}
