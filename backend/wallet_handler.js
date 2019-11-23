function getWalletHandler(req, res) {
   
   var mysql_helper = require('./mysql_helper');
   var userId = 1;


    var query="CALL playalong.getWallet(?)";
    console.log(query);


    const values = [[[userId]]];
    mysql_helper.executeQuery(query, values).then((result) => {
	     if(result[0].constructor.name=='OkPacket')
                  res.send(result[1]);
             else
		  res.send(result[0]);

                });
}

module.exports = {
    getWalletHandler: getWalletHandler

}
