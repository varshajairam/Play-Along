var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "terry",
    multipleStatements: true
});


var functionSelect = (queryString) => { // console.log(queryString);
    return new Promise((resolve, reject) => {
        con.query(queryString, function(err, rows, fields) {
            if (err) {
                resolve(false);
                console.log(err);
            } else {
                console.log(rows);
                resolve(rows);

            }
        })
    })
}


module.exports = {
    functionSelect: functionSelect
}

