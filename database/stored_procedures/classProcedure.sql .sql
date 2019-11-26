DELIMITER $$
DROP PROCEDURE if exists `Class`;
CREATE PROCEDURE `Class`(
 IN game_type_id int(11),
 IN name varchar(255),
 IN student_count int(11),
 IN cost int(11),
 IN apt varchar(32),
 IN street varchar(128),
 IN city varchar(32),
 IN country char(2),
 IN zipcode varchar(12),
 IN created_by int(11),
 IN created_on datetime,
 IN instructor_id int(11),
 IN startdate datetime, 
 IN enddate datetime,
 out err_res varchar(255),
 out insert_msg varchar(255)
 )
BEGIN
	DECLARE `_rollback` BOOL DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `_rollback` = 1;
	 
     START TRANSACTION;
		INSERT INTO CLASS(game_type_id, name, student_count ,cost, apt, street, city, country, zipcode, created_by, created_on, instructor_id) values (game_type_id, name, student_count, cost*100, apt, street, city, country, zipcode, created_by, created_on, instructor_id);
        INSERT INTO CLASS_SCHEDULE(class_id, day, start_time, end_time) values (LAST_INSERT_ID(), dayofweek(startdate), startdate, enddate);
       
         IF `_rollback` THEN
			set @err_res = "FAILED";
			ROLLBACK;
         ELSE
			set @insert_msg = "Success";
			COMMIT;
         END IF;
				
END$$
DELIMITER ;
