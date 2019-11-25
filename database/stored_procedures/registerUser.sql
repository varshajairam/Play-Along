DELIMITER $$
DROP PROCEDURE if exists `registerUser`;
CREATE PROCEDURE `registerUser`(
 IN name varchar(255),
 IN email varchar(255),
 IN password char(60),
 IN is_admin tinyint(4),
 IN dob datetime,
 IN mobile varchar(15),
 IN country varchar(32),
 IN zipcode varchar(12))
BEGIN
	DECLARE `_rollback` BOOL DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `_rollback` = 1;
	 
     START TRANSACTION;
		INSERT INTO user (name, email, password, is_admin, dob, mobile, country, zipcode) values (name, email, password, is_admin, dob, mobile, country, zipcode);
        INSERT INTO wallet(user_id,balance ) values (LAST_INSERT_ID(),0);
       
         IF `_rollback` THEN
			ROLLBACK;
         ELSE
			COMMIT;
         END IF;
				
END$$
DELIMITER ;
