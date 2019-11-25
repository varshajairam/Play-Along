function getGamesHandler(req, res) {
    var mysql_helper = require('./mysql_helper.js');
    //var userId = 1;
    var userId= req.user.id;
   
     
    console.log("UserID: " + userId+" zipcode:"+ req.query.zipcode) ;
    var sql="call playalong.getHome ?;";
    const values = [[[userId,req.query.zipcode]]];
    mysql_helper.executeQuery(sql, values).then((result) => {
			res.send(result[0]);
		});
}

module.exports = {
    getGamesHandler: getGamesHandler
	
}

