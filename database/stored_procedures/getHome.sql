DELIMITER $$
DROP PROCEDURE if exists `getHome`;
CREATE  PROCEDURE `getHome`(IN userId int(11),
IN zipcode varchar(12))
Begin

SELECT A.*,count(GE.user_id) as spotsTaken from 
(SELECT G.id,G.game_type_id,G.name,DATE_FORMAT(DATE, '%m-%d-%Y') as date,players_count ,cost/100 as cost,
	json_object('apt',G.apt,'street',G.street,'city',G.city,'country',G.country,'zipcode',G.zipcode) AS
     address,created_by,DATE_FORMAT(created_on, '%m-%d-%Y') as created_on,owner_id,
     IF(EXISTS(SELECT * FROM playalong.game_enrollment WHERE game_id = G.id and user_id=userId)=1,'True','False') as hasJoined,S.level as skill
     FROM playalong.games G,playalong.skill_level_enum S
     where
	 (zipcode IS NULL OR C.zipcode=zipcode) and 
     G.required_skill_level_id = S.id)A
     LEFT JOIN playalong.game_enrollment GE
     on A.id=GE.game_id
	 Group by A.id,A.game_type_id,A.name,A.date,A.players_count,A.cost,A.address,A.created_by,A.created_on,A.owner_id,A.hasJoined,A.skill,GE.game_id;
    
     
END$$
DELIMITER ;

