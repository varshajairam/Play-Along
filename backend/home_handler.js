function getGamesHandler(req, res) {
    var dbConnection = require('./db_connectio.js');
    var zipcode = req.query.zipcode;
    
    var sql = `SELECT id,game_type_id,name,DATE_FORMAT(DATE, '%Y-%m-%d') as date,players_count,cost/100 as cost,
     json_object('apt',apt,'street',street,'city',city,'country',country,'zipcode',zipcode) AS
     address,created_by,DATE_FORMAT(created_on, '%Y-%m-%d') as created_on,owner_id,
     IF(EXISTS(SELECT true FROM playalong.game_enrollment WHERE id = G.id)=1,'True','False') as hasJoined,required_skill_level_id

  FROM playalong.games G where zipcode=` + zipcode + ";";
    
    
//    var sql="call playalong.getHome("+zipcode+");";
    console.log(sql);
    (async() => {

        var result = await dbConnection.functionSelect(sql);
	//result = result.map(row => (row.package = JSON.stringify(row.package), row));
        res.send(result);
    })()
}

function completeEnroll(req, res) {
res.send("hello")
}
module.exports = {
    getGamesHandler: getGamesHandler,
    completeEnroll:completeEnroll
	
}

