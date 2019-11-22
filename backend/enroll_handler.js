function enrollGamesHandler(req, res) {

    var mysql_helper = require('./mysql_helper');

    var query="call playalong.enroll(?,?,?,?,@result,@enroll);select @resultEnroll as resultEnroll,@enrollMessage as enrollResponse;"
    
    const values = [[[req.body.amount, req.body.id,req.body.owner_id, req.body.game_id]]];
		mysql_helper.executeQuery(query,[req.body.amount, req.body.id,req.body.owner_id, req.body.game_id]).then((result) => {
                if(result[0].constructor.name=='OkPacket')
           		res.send(result[1]);
        	else
           		res.send(result[0]);

		});



}
module.exports = {
    enrollGamesHandler:enrollGamesHandler

}
