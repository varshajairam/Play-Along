function getGamesHandler(req,res){
        var dbConnection = require('./db_connectio.js');
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
  FROM playalong.games where zipcode=`+zipcode+";";

                (async()=>{

                        var result=await dbConnection.functionSelect(sql);
                res.send(result);
                })()
}

module.exports = {
        getGamesHandler:getGamesHandler
}

