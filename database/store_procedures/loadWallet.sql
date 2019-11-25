DELIMITER $$
DROP PROCEDURE if exists `loadWallet`;
CREATE PROCEDURE `loadWallet`(IN amount int(11),
 IN userId int(11),
 OUT response varchar(255))
BEGIN
	DECLARE `_rollback` BOOL DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `_rollback` = 1;
    
    START TRANSACTION;
		
        update wallet set balance=balance+amount where user_id=userId;
        select id into @walletID from wallet where user_id=userId;
        set @transactionId= RIGHT(UUID_short(), 11);
        insert into wallet_payments(transactionId,amount,wallet_id,type,status) values( @transactionId,amount,@walletID,1,1);
        
		IF `_rollback` THEN
			ROLLBACK;
            insert into wallet_payments(transactionId,amount,wallet_id,type,status) values( @transactionId,amount,@walletID,1,3);
        SET @loadResponse="Failed";
		ELSE
			COMMIT;
            SET @loadResponse="Success";
		END IF;
     
END$$
DELIMITER ;
