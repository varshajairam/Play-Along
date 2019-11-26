DELIMITER $$
DROP PROCEDURE if exists `createGame`;
CREATE PROCEDURE `createGame`
(IN game_type_id int(11),
IN  name varchar(255),
IN date datetime,
IN player_count int(11),
IN cost int (11),
IN apt varchar(32),
IN street varchar(128),
IN city varchar(32),
IN country char(2),
IN zipcode 	varchar(12),
IN created_by int(11),
IN created_on datetime,
IN owner_id int(11),
IN required_skill_level_id int(11),
IN user_Id int(11))
BEGIN
			DECLARE `_rollback` BOOL DEFAULT 0;
			DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `_rollback` = 1;
			
            START TRANSACTION;
            
			INSERT INTO GAMES ( game_type_id, name, date, players_count ,cost, apt, street,city, country, zipcode, created_by, created_on, owner_id, required_skill_level_id) VALUES 
            (game_type_id,name,date,player_count,cost,apt,street,city,country,zipcode,created_by,created_on,owner_id,required_skill_level_id);
		
            INSERT into game_enrollment(game_id,user_id) values (LAST_INSERT_ID(),user_Id);
			
            IF `_rollback` THEN
			ROLLBACK;
			ELSE
				COMMIT;
			END IF;
    
END$$
DELIMITER ;
