DELIMITER $$
DROP PROCEDURE if exists `getClass`;
CREATE PROCEDURE `getClass`(IN userID int(11),
IN zipcode varchar(12))
BEGIN
select A.class_id,A.class_name,A.game_type_id,A.student_count,count(CE.user_id) as spotsTaken,A.cost,A.address,A.start_time,A.end_time,A.hasJoined,A.created_by,A.instructor_name, A.instructor_id from 
(select C.id as class_id,C.name as class_name,C.game_type_id,C.student_count,C.cost/100 as cost,json_object('apt',C.apt,'street',C.street,'city',C.city,'country',C.country,'zipcode',C.zipcode) AS
    address,DATE_FORMAT(CS.start_time, '%m-%d-%Y') as start_time ,DATE_FORMAT(CS.end_time,'%m-%d-%Y') as end_time, C.created_by,I.name as instructor_name,I.id as instructor_id,
    IF(EXISTS(SELECT * FROM playalong.class_enrollment WHERE class_id= C.id and user_id=userID )=1,'True','False') as hasJoined
     FROM class C,class_schedule CS,User I
     WHERE CS.class_id= C.id and
	 (zipcode IS NULL OR C.zipcode=zipcode) and
	 I.id=C.instructor_id)A 
	LEFT JOIN playalong.class_enrollment CE
	on A.class_id=CE.class_id
	Group by  A.class_id,A.class_name,A.game_type_id,A.student_count,A.cost,A.address,A.start_time,A.end_time,A.created_by,A.instructor_name;

END$$
DELIMITER ;

