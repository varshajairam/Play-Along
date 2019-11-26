DELIMITER $$
DROP PROCEDURE if exists `enroll`;
CREATE  PROCEDURE `enroll`(IN amount int(11),
 IN userId int(11),
 IN ownerId int(11),
 IN gameId int(11),
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
    select id into @ownerWalletId from wallet where user_id=ownerId;



                START TRANSACTION;
            IF @walletBalance >=amount
                                THEN
                                        update wallet set balance=balance-amount where user_id=UserId;
                                        update wallet set balance=balance+amount where user_id=ownerId;
                                        insert into game_enrollment (game_id,user_id) values (gameId,UserId);
                                        insert into wallet_transactions(source_id,destination_id,amount,status) values (@userWalletId,@ownerWalletId,amount,1);
                                        SET @resultEnroll="True";
                                        SET @enrollMessage="Success";

                                        COMMIT;

                        ELSE
                                SET @resultEnroll="False";
                                SET @enrollMessage="No funds";
                        END IF;

END$$
DELIMITER ;

