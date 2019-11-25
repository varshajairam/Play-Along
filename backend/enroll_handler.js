function enrollGamesHandler(req, res) {

    var mysql_helper = require('./mysql_helper');
    var userID=req.user.id;
    //var userID=1;
    

    var query="call playalong.enroll(?,?,?,?,@result,@enroll);select @resultEnroll as resultEnroll,@enrollMessage as enrollResponse;"

    console.log("Amount:"+req.body.amount*100+" user_id:"+userID+" owner_id:"+req.body.owner_id+" game_id:"+req.body.game_id);
    mysql_helper.executeQuery(query,[req.body.amount*100, userID,req.body.owner_id, req.body.game_id]).then((result) => {
			
                if(result[0].constructor.name=='OkPacket')
                        res.send(result[1]);
                else
                        res.send(result[0]);

                });



}
module.exports = {
    enrollGamesHandler:enrollGamesHandler

}
