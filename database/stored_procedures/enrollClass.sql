DELIMITER $$
DROP PROCEDURE if exists `enrollClass`;
CREATE  PROCEDURE `enrollClass`(IN amount int(11),
 IN userId int(11),
 IN InstructorId int(11),
 IN classId int(11),
 OUT resultEnroll varchar(255),
 OUT enrollMessage varchar(255))
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET @resultEnroll="False";-- rollback any error in the transaction
        SET @enrollMessage="Failed";
    END;
	 select balance,id into @walletBalance,@userWalletId from wallet where user_id=userId;
	 select id into @instructorWalletId from wallet where user_id=InstructorId;
	 
     START TRANSACTION;
            IF @walletBalance/100 >=amount 
				THEN
					update wallet set balance=balance-amount where user_id=UserId;
					update wallet set balance=balance+amount where user_id=InstructorId;
					insert into class_enrollment (class_id,user_id) values (classId,UserId);
					insert into wallet_transactions(source_id,destination_id,amount,status) values (@userWalletId,@instructorWalletId,amount,1);
					SET @resultEnroll="True";
					SET @enrollMessage="Success";
            
					COMMIT;

			ELSE 
				insert into wallet_transactions(source_id,destination_id,amount,status) values (@userWalletId,@instructorWalletId,amount,2);
				SET @resultEnroll="False";
				SET @enrollMessage="No funds";
			END IF;
END$$
DELIMITER ;
