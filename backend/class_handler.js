function getClassHandler(req, res) {
    console.log("jkjkj");
    var mysql_helper = require('./mysql_helper.js');
    var userId = 1 ;

    console.log("99");
    var sql="call playalong.getClass ?;";
    const values = [[[userId]]];

    mysql_helper.executeQuery(sql, values).then((result) => {
                        res.send(result[0]);
                });
}

module.exports = {
    getClassHandler:getClassHandler

}
