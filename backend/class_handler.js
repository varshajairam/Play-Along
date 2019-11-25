function getClassHandler(req, res) {
    
    console.log("getClassHandler");
    var mysql_helper = require('./mysql_helper.js');
    //var userID=1;
    var userID = req.user.id ;


    console.log("user_id:"+userID,"zipcode: "+req.body.zipcode);
    var sql="call playalong.getClass ?;";
    const values = [[[userID,req.body.zipcode]]];

    mysql_helper.executeQuery(sql, values).then((result) => {
                        res.send(result[0]);
                });
}

module.exports = {
    getClassHandler:getClassHandler

}
