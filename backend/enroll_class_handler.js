function enrollClassHandler(req,res){

       console.log("enrollClassHandler");

       var mysql_helper = require('./mysql_helper.js');
       //var userID =1;
       var userID= req.user.id;
	

       console.log("cost:"+req.body.cost*100+" userID:"+userID+" instructor_id:"+req.body.instructor_id+" class_id:"+req.body.class_id);
       var sql= "call playalong.enrollClass(?,?,?,?,@result,@message);select @resultEnroll as resultEnroll,@enrollMessage as enrollResponse;";

       mysql_helper.executeQuery(sql,[req.body.cost*100,userID,req.body.instructor_id,req.body.class_id]).then((result) => {
                
	     	if(result[0].constructor.name=='OkPacket')
           		res.send(result[1]);
		else
           		res.send(result[0]);


	});

}
module.exports={
	enrollClassHandler:enrollClassHandler

}

