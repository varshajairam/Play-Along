function getWalletHandler(req, res) {
    var dbConnection = require('./mysql_helper.js');
    var userId = 1;


    var sql="CALL playalong.getWallet(?)";
    console.log(sql);


    const values = [[[userId]]];
    mysql_helper.executeQuery(query, values).then((result) => {
                  res.send("Success");
                });
/*
    (async() => {

        var result = await dbConnection.functionSelect(sql);
        //result = result.map(row => (row.package = JSON.stringify(row.package), row));
        res.send(result);
    })()

*/
}

module.exports = {
    getWalletHandler: getWalletHandler,

}

