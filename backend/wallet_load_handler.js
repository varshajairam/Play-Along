function walletLoadHandler(req, res) {

    var mysql_helper = require('./mysql_helper');
    var userID=1;

    var query="call playalong.loadWallet(?,?,@load);select @loadResponse as response;"
    
    mysql_helper.executeQuery(query,[req.body.amount,userID]).then((result) => {
                if(result[0].constructor.name=='OkPacket')
           		res.send(result[1]);
        	else
           		res.send(result[0]);

		});



}
module.exports = {
    walletLoadHandler:walletLoadHandler

}
