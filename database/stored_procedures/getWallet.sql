DELIMITER $$
DROP PROCEDURE if exists `getWallet`;
CREATE  PROCEDURE `getWallet`(IN userID int(11))
BEGIN
	select balance/100 as balance from wallet where user_id=UserID; 
END$$
DELIMITER ;

