function enrollGamesHandler(req, res) {

    var mysql_helper = require('./mysql_helper');
    var userId = req.body.id;
    var ownerId= req.body.owner_id;
    var gameId=req.body.game_id;
    var amount=req.body.amount;
    set mysql.createConnection({multipleStatements: true});

    //var sql="call playalong.enroll("+amount+","+userId+","+ownerId+","+gameId+",@result,@enrollRes);select @resultEnroll as resultEnroll,@enrollMessage as enrollResponse;";
    
    var query="call playalong.enroll(?,?,?,?,@resultEnroll,@enrollMessage);select @resultEnroll as resultEnroll,@enrollMessage as enrollResponse;"
    console.log(query);
    
    const values = [[[req.body.amount, req.body.id,req.body.owner_id, req.body.game_id]]];
		mysql_helper.executeQuery(query,[req.body.amount, req.body.id,req.body.owner_id, req.body.game_id]).then((result) => {
			res.send(result[0]);
		});

    /*
    (async() => {

        var result = await dbConnection.functionSelect(sql);
        //result = result.map(row => (row.package = JSON.stringify(row.package), row));
        console.log(result);	

	if(result[0].constructor.name=='OkPacket')
	   res.send(result[1]);
	else
	   res.send(result[0]);

    })()*/
}
module.exports = {
    enrollGamesHandler:enrollGamesHandler

}
