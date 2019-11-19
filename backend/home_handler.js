function getGamesHandler(req, res) {
    var dbConnection = require('./db_connectio.js');
    var userId = req.query.id;
    
    var sql = `SELECT G.id,G.game_type_id,G.name,DATE_FORMAT(DATE, '%Y-%m-%d') as date,players_count,cost/100 as cost,
     json_object('apt',G.apt,'street',G.street,'city',G.city,'country',G.country,'zipcode',G.zipcode) AS
     address,created_by,DATE_FORMAT(created_on, '%Y-%m-%d') as created_on,owner_id,
     IF(EXISTS(SELECT true FROM playalong.game_enrollment WHERE id = U.id)=1,'True','False') as hasJoined,S.level as skill
     FROM playalong.games G, playalong.user U,playalong.skill_level_enum S where
     U.zipcode=G.zipcode and
     G.required_skill_level_id = S.id and
     U.id=`+userId+";";
    
    
    //var sql="call playalong.getHome("+userId+");";
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

