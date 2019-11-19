var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Strikingviking"
});


var functionSelect = (queryString) => { // console.log(queryString);
    return new Promise((resolve, reject) => {
        con.query(queryString, function(err, rows, fields) {
            if (err) {
                resolve(false);
                console.log(err);
            } else {
                console.log(rows);
                resolve(JSON.stringify(rows));

            }
        })
    })
}


module.exports = {
    functionSelect: functionSelect
}

