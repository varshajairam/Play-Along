function getWalletHandler(req, res) {
   
   console.log("getWalletHandler");
   var mysql_helper = require('./mysql_helper');
   //var userID = 1;
   var userID= req.user.id;


    var query="CALL playalong.getWallet(?)";
    
    console.log("user_id:"+userID);


    const values = [[[userID]]];
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
