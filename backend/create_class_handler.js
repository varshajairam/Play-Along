var mysql_helper = require('./mysql_helper');
var dateFormat = require('dateformat');

function createClassHandler(req, res) {
    
    var sql="call PlayAlong.Class?;";
    const startdate = req.body.startdate.split('T')[0];
    const enddate = req.body.enddate.split('T')[0];
    var day=dateFormat(new Date(), "yyyy-mm-dd");
    const values = [[[req.body.games, req.body.classname, req.body.studentCount, req.body.cost, req.body.apt, req.body.street, req.body.city, req.body.country, req.body.zipcode, 24, day, 24, startdate, enddate]]];
    
    mysql_helper.executeQuery(sql, values).then((result) => {
      res.send(result[0]);
    });

    }


module.exports = {
    createClassHandler: createClassHandler
}
