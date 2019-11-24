DELIMITER $$
DROP PROCEDURE IF EXISTS `Register`;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Register`(
 IN name varchar(255),
 IN email varchar(255),
 IN password varchar(45),
 IN dob datetime,
 IN mobile varchar(45),
 IN country char(2),
 IN zipcode varchar(12)
 
 )
BEGIN
	DECLARE `_rollback` BOOL DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `_rollback` = 1;
	 
     START TRANSACTION;
		INSERT INTO user (name, email, password, is_admin, dob, mobile, country, zipcode) VALUES (name, email, password, 0, dob, mobile, country, zipcode);
        INSERT INTO wallet (user_id, balance) values (LAST_INSERT_ID(), 0);
       
         IF `_rollback` THEN
			ROLLBACK;
         ELSE
			
			COMMIT;
         END IF;
				
END$$
DELIMITER ;
