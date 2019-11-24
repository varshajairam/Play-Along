function enrollClassHandler(req,res){

       var mysql_helper = require('./mysql_helper.js');
       var userId =1;

	var sql= "call playalong.enrollClass(?,?,?,?,@result,@message);select @resultEnroll as resultEnroll,@enrollMessage as enrollResponse;";
	const values = [[[req.body.cost,userId,req.body.instructor_id,req.body.class_id]]];

        mysql_helper.executeQuery(sql,[req.body.cost,userId,req.body.instructor_id,req.body.class_id]).then((result) => {
                
	     	if(result[0].constructor.name=='OkPacket')
           		res.send(result[1]);
		else
           		res.send(result[0]);


	});

}
module.exports={
	enrollClassHandler:enrollClassHandler

}

