var mysql_helper = require('./mysql_helper');
var dateFormat = require('dateformat');

function createClassHandler(req, res) {


    var sql= "call Class(?,?,?,?,?,?,?,?,?,?,?,?,?,?,@res,@message);select @err_res as err_res,@insert_msg as insert_msg";
    console.log("hello");
    const startdate = req.body.startdate.split('T')[0];
    const enddate = req.body.enddate.split('T')[0];
    var day=dateFormat(new Date(), "yyyy-mm-dd");


    mysql_helper.executeQuery(sql, [req.body.games, req.body.classname, req.body.studentCount, req.body.cost, req.body.apt, req.body.street, req.body.city, req.body.country, req.body.zipcode, req.user.id, day, req.user.id, startdate, enddate]).then((result) => {
        console.log(result[1]);
        if(result[0].constructor.name=='OkPacket')
            res.send(result[1]);
        else
            res.send(result[0]);
    });

    }

module.exports = {
    createClassHandler: createClassHandler
}
