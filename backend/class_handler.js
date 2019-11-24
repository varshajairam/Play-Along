function getClassHandler(req, res) {
    var mysql_helper = require('./mysql_helper.js');
    var userId = reg.user.id ;

    var sql="call playalong.getClass ?;";
    const values = [[[userId]]];

    mysql_helper.executeQuery(sql, values).then((result) => {
                        res.send(result[0]);
                });
}

module.exports = {
    getClassHandler:getClassHandler

}
