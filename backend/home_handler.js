function getGamesHandler(req,res){
        var dbConnection = require('./db_connectio.js');
        var zipcode=req.query.zipcode;
        var sql=`SELECT id,game_type_id,name,DATE_FORMAT(DATE, '%Y-%m-%d') as date,players_count,cost,
     json_object('apt',apt,'street',street,'city',city,'country',country,'zipcode',zipcode) AS
     address,created_by,DATE_FORMAT(created_on, '%Y-%m-%d') as created_on,owner_id,
     IF(EXISTS(SELECT true FROM playalong.game_enrollment WHERE id = G.id)=1,'true','false') as hasJoined
  FROM playalong.games G where zipcode=`+zipcode+";";
  console.log(sql); 
  /*
   var sql=`SELECT id,game_type_id,name,DATE_FORMAT(DATE, '%Y-%m-%d') as date,players_count,cost,
   CONCAT
    ("{",
      'apt:', '"', coalesce(apt,"")   , '"', ','
      'street:', '"', street, '"', ','
          'city:', '"', city, '"', ','
           'country:', '"', country, '"', ','
      'zipcode:'  , zipcode ,"}"
    ) AS address,created_by,DATE_FORMAT(created_on, '%Y-%m-%d') as created_on,owner_id
  FROM playalong.games where zipcode=`+zipcode+";";
  console.log(sql);
  */
                (async()=>{

                        var result=await dbConnection.functionSelect(sql);
		//	results = results.map(row => (row.package = JSON.stringify(row.package), row));
                res.send(result);
                })()
}

module.exports = {
        getGamesHandler:getGamesHandler
}

