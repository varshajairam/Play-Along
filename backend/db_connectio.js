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

/*
function functionSelect(sql){

con.connect(function(err) {
  var x;
  if (err) throw err;
  console.log("Connected!");
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(JSON.parse(JSON.stringify(result)));
    x=JSON.parse(JSON.stringify(result));
    //return(JSON.parse(JSON.stringify(result)));
    //return "helloworld";
  });
con.end();
});
 return x;
}
*/



var functionSelect = (queryString) => {     // console.log(queryString);     
	return new Promise((resolve, reject) => {         
		con.query(queryString, function(err, rows, fields) {             
			if (err) {                 
				resolve(false);                 
				 console.log(err);             
			}             
			else {
				console.log(rows);
				resolve(rows); 
				
			}        
		})     }) }


module.exports = {
        functionSelect: functionSelect
}


