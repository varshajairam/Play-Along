var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "terry"
});

var sql = "insert into playalong.user values('1','Belinda','belinda,terry@gmail.com','oo',1,'2016-01-01',9888,'pp','pp','io','IN',90)";
var selectSql="Select * from users" 

function functionInsert(con,sql){

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
con.end();
});
}


function functionSelect(sql){

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(JSON.parse(JSON.stringify(result)));
  });
con.end();
});
}

module.exports = {
        functionSelect: functionSelect
}


