function enrollClassHandler(req,res){

       var mysql_helper = require('./mysql_helper.js');
       var userId =1;

	var sql= "call playalong.enrollClass ?;";
	const values = [[[req.body.cost,userId,req.body.instructor_id,req.body.class_id]]];

        mysql_helper.executeQuery(sql, values).then((result) => {
                        res.send(result[0]);
                });





}
module.exports={
	enrollClassHandler:enrollClassHandler

}

