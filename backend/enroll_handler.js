function enrollGamesHandler(req, res) {

    var dbConnection = require('./db_connectio.js');
    var userId = req.body.id;
    var ownerId= req.body.owner_id;
    var gameId=req.body.game_id;
    var amount=req.body.amount;
    
    var sql="call playalong.enroll("+amount+","+userId+","+ownerId+","+gameId+",@result,@enrollRes);select @resultEnroll as resultEnroll,@enrollMessage as enrollResponse;";
    console.log(sql);
    (async() => {

        var result = await dbConnection.functionSelect(sql);
        //result = result.map(row => (row.package = JSON.stringify(row.package), row));
        console.log(result);	

	if(result[0].constructor.name=='OkPacket')
	   res.send(result[1]);
	else
	   res.send(result[0]);

    })()
}
module.exports = {
    enrollGamesHandler:enrollGamesHandler

}
