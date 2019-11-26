-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema PlayAlong
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema PlayAlong
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `PlayAlong` DEFAULT CHARACTER SET utf8 ;
USE `PlayAlong` ;

-- -----------------------------------------------------
-- Table `PlayAlong`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PlayAlong`.`user` ;

CREATE TABLE IF NOT EXISTS `PlayAlong`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` CHAR(60) NOT NULL,
  `is_admin` TINYINT NOT NULL,
  `dob` DATETIME NOT NULL,
  `mobile` VARCHAR(15) NOT NULL,
  `apt` VARCHAR(32) NULL,
  `street` VARCHAR(128) NULL,
  `city` VARCHAR(32) NULL,
  `country` CHAR(2) NOT NULL,
  `zipcode` VARCHAR(12) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PlayAlong`.`wallet`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PlayAlong`.`wallet` ;

CREATE TABLE IF NOT EXISTS `PlayAlong`.`wallet` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `balance` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_wallet_user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_wallet_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `PlayAlong`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PlayAlong`.`transaction_status_enum`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PlayAlong`.`transaction_status_enum` ;

CREATE TABLE IF NOT EXISTS `PlayAlong`.`transaction_status_enum` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(12) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PlayAlong`.`wallet_transactions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PlayAlong`.`wallet_transactions` ;

CREATE TABLE IF NOT EXISTS `PlayAlong`.`wallet_transactions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `source_id` INT NOT NULL,
  `destination_id` INT NOT NULL,
  `amount` VARCHAR(45) NOT NULL,
  `status` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_wallet_transactions_wallet_source_idx` (`source_id` ASC) VISIBLE,
  INDEX `fk_wallet_transactions_wallet_destination_idx` (`destination_id` ASC) VISIBLE,
  INDEX `fk_wallet_transactions_status_idx` (`status` ASC) VISIBLE,
  CONSTRAINT `fk_wallet_transactions_wallet_source`
    FOREIGN KEY (`source_id`)
    REFERENCES `PlayAlong`.`wallet` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_wallet_transactions_wallet_destination`
    FOREIGN KEY (`destination_id`)
    REFERENCES `PlayAlong`.`wallet` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_wallet_transactions_status`
    FOREIGN KEY (`status`)
    REFERENCES `PlayAlong`.`transaction_status_enum` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PlayAlong`.`wallet_payments_type_enum`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PlayAlong`.`wallet_payments_type_enum` ;

CREATE TABLE IF NOT EXISTS `PlayAlong`.`wallet_payments_type_enum` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(12) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PlayAlong`.`wallet_payments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PlayAlong`.`wallet_payments` ;

CREATE TABLE IF NOT EXISTS `PlayAlong`.`wallet_payments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `transactionId` VARCHAR(32) NOT NULL,
  `amount` INT NOT NULL,
  `wallet_id` INT NOT NULL,
  `type` INT NOT NULL,
  `status` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `transaction_id_UNIQUE` (`transactionId` ASC) VISIBLE,
  INDEX `fk_wallet_payments_wallet_idx` (`wallet_id` ASC) VISIBLE,
  INDEX `fk_wallet_payments_type_enum_idx` (`type` ASC) VISIBLE,
  INDEX `fk_wallet_payments_status_enum_idx` (`status` ASC) VISIBLE,
  CONSTRAINT `fk_wallet_payments_wallet`
    FOREIGN KEY (`wallet_id`)
    REFERENCES `PlayAlong`.`wallet` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_wallet_payments_type_enum`
    FOREIGN KEY (`type`)
    REFERENCES `PlayAlong`.`wallet_payments_type_enum` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_wallet_payments_status_enum`
    FOREIGN KEY (`status`)
    REFERENCES `PlayAlong`.`transaction_status_enum` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PlayAlong`.`games_enum`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PlayAlong`.`games_enum` ;

CREATE TABLE IF NOT EXISTS `PlayAlong`.`games_enum` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(24) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PlayAlong`.`skill_level_enum`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PlayAlong`.`skill_level_enum` ;

CREATE TABLE IF NOT EXISTS `PlayAlong`.`skill_level_enum` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `level` VARCHAR(12) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PlayAlong`.`user_skills`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PlayAlong`.`user_skills` ;

CREATE TABLE IF NOT EXISTS `PlayAlong`.`user_skills` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `game_id` INT NOT NULL,
  `skill_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_skills_user_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_user_skills_games_enum_idx` (`game_id` ASC) VISIBLE,
  INDEX `fk_user_skills_skill_level_enum_idx` (`skill_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_skills_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `PlayAlong`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_skills_games_enum`
    FOREIGN KEY (`game_id`)
    REFERENCES `PlayAlong`.`games_enum` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_skills_skill_level_enum`
    FOREIGN KEY (`skill_id`)
    REFERENCES `PlayAlong`.`skill_level_enum` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PlayAlong`.`games`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PlayAlong`.`games` ;

CREATE TABLE IF NOT EXISTS `PlayAlong`.`games` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `game_type_id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `date` DATETIME NOT NULL,
  `players_count` INT NOT NULL,
  `cost` INT NOT NULL,
  `apt` VARCHAR(32) NULL,
  `street` VARCHAR(128) NULL,
  `city` VARCHAR(32) NULL,
  `country` CHAR(2) NOT NULL,
  `zipcode` VARCHAR(12) NOT NULL,
  `created_by` INT NOT NULL,
  `created_on` DATETIME NOT NULL,
  `owner_id` INT NOT NULL,
  `required_skill_level_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_games_games_enum_idx` (`game_type_id` ASC) VISIBLE,
  INDEX `fk_games_users_idx` (`created_by` ASC) VISIBLE,
  INDEX `fk_games_users_owner_idx` (`owner_id` ASC) VISIBLE,
  INDEX `fk_games_skill_level_enum_idx` (`required_skill_level_id` ASC) VISIBLE,
  CONSTRAINT `fk_games_games_enum`
    FOREIGN KEY (`game_type_id`)
    REFERENCES `PlayAlong`.`games_enum` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_games_users`
    FOREIGN KEY (`created_by`)
    REFERENCES `PlayAlong`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_games_users_owner`
    FOREIGN KEY (`owner_id`)
    REFERENCES `PlayAlong`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_games_skill_level_enum`
    FOREIGN KEY (`required_skill_level_id`)
    REFERENCES `PlayAlong`.`skill_level_enum` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PlayAlong`.`game_enrollment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PlayAlong`.`game_enrollment` ;

CREATE TABLE IF NOT EXISTS `PlayAlong`.`game_enrollment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `game_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_game_enrollment_games_idx` (`game_id` ASC) VISIBLE,
  INDEX `fk_game_enrollment_user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_game_enrollment_games`
    FOREIGN KEY (`game_id`)
    REFERENCES `PlayAlong`.`games` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_game_enrollment_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `PlayAlong`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PlayAlong`.`class`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PlayAlong`.`class` ;

CREATE TABLE IF NOT EXISTS `PlayAlong`.`class` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `game_type_id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `student_count` INT NOT NULL,
  `cost` INT NOT NULL,
  `apt` VARCHAR(32) NULL,
  `street` VARCHAR(128) NULL,
  `city` VARCHAR(32) NULL,
  `country` CHAR(2) NOT NULL,
  `zipcode` VARCHAR(12) NOT NULL,
  `created_by` INT NOT NULL,
  `created_on` DATETIME NOT NULL,
  `instructor_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_class_games_enum_idx` (`game_type_id` ASC) VISIBLE,
  INDEX `fk_class_users_idx` (`created_by` ASC) VISIBLE,
  INDEX `fk_class_users_instructor_idx` (`instructor_id` ASC) VISIBLE,
  CONSTRAINT `fk_class_games_enum`
    FOREIGN KEY (`game_type_id`)
    REFERENCES `PlayAlong`.`games_enum` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_class_users`
    FOREIGN KEY (`created_by`)
    REFERENCES `PlayAlong`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_class_users_instructor`
    FOREIGN KEY (`instructor_id`)
    REFERENCES `PlayAlong`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PlayAlong`.`day_enum`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PlayAlong`.`day_enum` ;

CREATE TABLE IF NOT EXISTS `PlayAlong`.`day_enum` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `day` VARCHAR(12) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PlayAlong`.`class_schedule`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PlayAlong`.`class_schedule` ;

CREATE TABLE IF NOT EXISTS `PlayAlong`.`class_schedule` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `class_id` INT NOT NULL,
  `day` INT NOT NULL,
  `start_time` DATETIME NOT NULL,
  `end_time` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_class_schedule_class_idx` (`class_id` ASC) VISIBLE,
  INDEX `fk_class_schedule_day_enum_idx` (`day` ASC) VISIBLE,
  CONSTRAINT `fk_class_schedule_class`
    FOREIGN KEY (`class_id`)
    REFERENCES `PlayAlong`.`class` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_class_schedule_day_enum`
    FOREIGN KEY (`day`)
    REFERENCES `PlayAlong`.`day_enum` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PlayAlong`.`class_enrollment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PlayAlong`.`class_enrollment` ;

CREATE TABLE IF NOT EXISTS `PlayAlong`.`class_enrollment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `class_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_class_enrollment_class_idx` (`class_id` ASC) VISIBLE,
  INDEX `fk_class_enrollment_user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_class_enrollment_class`
    FOREIGN KEY (`class_id`)
    REFERENCES `PlayAlong`.`class` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_class_enrollment_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `PlayAlong`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PlayAlong`.`complaints`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PlayAlong`.`complaints` ;

CREATE TABLE IF NOT EXISTS `PlayAlong`.`complaints` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(32) NOT NULL,
  `description` TEXT NOT NULL,
  `status` INT NOT NULL,
  `made_by` INT NOT NULL,
  `made_on` DATETIME NOT NULL,
  `reviewed_by` INT NULL,
  `reviewed_on` DATETIME NULL,
  `review_message` TEXT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_complaints_user_maker_idx` (`made_by` ASC) VISIBLE,
  INDEX `fk_complaints_user_reviewer_idx` (`reviewed_by` ASC) VISIBLE,
  CONSTRAINT `fk_complaints_user_maker`
    FOREIGN KEY (`made_by`)
    REFERENCES `PlayAlong`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_complaints_user_reviewer`
    FOREIGN KEY (`reviewed_by`)
    REFERENCES `PlayAlong`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `PlayAlong`.`transaction_status_enum`
-- -----------------------------------------------------
START TRANSACTION;
USE `PlayAlong`;
INSERT INTO `PlayAlong`.`transaction_status_enum` (`id`, `status`) VALUES (1, 'successful');
INSERT INTO `PlayAlong`.`transaction_status_enum` (`id`, `status`) VALUES (2, 'failed');
INSERT INTO `PlayAlong`.`transaction_status_enum` (`id`, `status`) VALUES (3, 'pending');

COMMIT;


-- -----------------------------------------------------
-- Data for table `PlayAlong`.`wallet_payments_type_enum`
-- -----------------------------------------------------
START TRANSACTION;
USE `PlayAlong`;
INSERT INTO `PlayAlong`.`wallet_payments_type_enum` (`id`, `type`) VALUES (1, 'deposit');
INSERT INTO `PlayAlong`.`wallet_payments_type_enum` (`id`, `type`) VALUES (2, 'withdraw');

COMMIT;


-- -----------------------------------------------------
-- Data for table `PlayAlong`.`games_enum`
-- -----------------------------------------------------
START TRANSACTION;
USE `PlayAlong`;
INSERT INTO `PlayAlong`.`games_enum` (`id`, `name`) VALUES (1, 'Cricket');
INSERT INTO `PlayAlong`.`games_enum` (`id`, `name`) VALUES (2, 'Basketball');
INSERT INTO `PlayAlong`.`games_enum` (`id`, `name`) VALUES (3, 'Baseball');
INSERT INTO `PlayAlong`.`games_enum` (`id`, `name`) VALUES (4, 'Tennis');
INSERT INTO `PlayAlong`.`games_enum` (`id`, `name`) VALUES (5, 'Volleyball');
INSERT INTO `PlayAlong`.`games_enum` (`id`, `name`) VALUES (6, 'Field Hockey');
INSERT INTO `PlayAlong`.`games_enum` (`id`, `name`) VALUES (7, 'Ice Hockey');
INSERT INTO `PlayAlong`.`games_enum` (`id`, `name`) VALUES (8, 'Soccer');
INSERT INTO `PlayAlong`.`games_enum` (`id`, `name`) VALUES (9, 'Badminton');
INSERT INTO `PlayAlong`.`games_enum` (`id`, `name`) VALUES (10, 'Boxing');
INSERT INTO `PlayAlong`.`games_enum` (`id`, `name`) VALUES (11, 'Carrom');
INSERT INTO `PlayAlong`.`games_enum` (`id`, `name`) VALUES (12, 'Chess');
INSERT INTO `PlayAlong`.`games_enum` (`id`, `name`) VALUES (13, 'Table Tennis');
INSERT INTO `PlayAlong`.`games_enum` (`id`, `name`) VALUES (14, 'Snooker');
INSERT INTO `PlayAlong`.`games_enum` (`id`, `name`) VALUES (15, 'Bowling');

COMMIT;


-- -----------------------------------------------------
-- Data for table `PlayAlong`.`skill_level_enum`
-- -----------------------------------------------------
START TRANSACTION;
USE `PlayAlong`;
INSERT INTO `PlayAlong`.`skill_level_enum` (`id`, `level`) VALUES (1, 'New');
INSERT INTO `PlayAlong`.`skill_level_enum` (`id`, `level`) VALUES (2, 'Beginner');
INSERT INTO `PlayAlong`.`skill_level_enum` (`id`, `level`) VALUES (3, 'Intermediate');
INSERT INTO `PlayAlong`.`skill_level_enum` (`id`, `level`) VALUES (4, 'Advanced');

COMMIT;


-- -----------------------------------------------------
-- Data for table `PlayAlong`.`day_enum`
-- -----------------------------------------------------
START TRANSACTION;
USE `PlayAlong`;
INSERT INTO `PlayAlong`.`day_enum` (`id`, `day`) VALUES (1, 'Monday');
INSERT INTO `PlayAlong`.`day_enum` (`id`, `day`) VALUES (2, 'Tuesday');
INSERT INTO `PlayAlong`.`day_enum` (`id`, `day`) VALUES (3, 'Wednesday');
INSERT INTO `PlayAlong`.`day_enum` (`id`, `day`) VALUES (4, 'Thursday');
INSERT INTO `PlayAlong`.`day_enum` (`id`, `day`) VALUES (5, 'Friday');
INSERT INTO `PlayAlong`.`day_enum` (`id`, `day`) VALUES (6, 'Saturday');
INSERT INTO `PlayAlong`.`day_enum` (`id`, `day`) VALUES (7, 'Sunday');

COMMIT;



-- --------------------------------------------------------------------
-- INSERTING THE SAMPLE DATA
-- --------------------------------------------------------------------

-- ---user----- 
-- The password is hashed before storage
INSERT INTO `playalong`.`user` (`id`, `name`, `email`, `password`, `is_admin`, `dob`, `mobile`, `apt`, `street`, `city`, `country`, `zipcode`, `is_blocked`) VALUES ('1', 'Karan', 'kup@gmail.com', '12', '1', '1996-10-31', '5096320147', '132', '1306', 'New York', 'US', '25962', '0');
INSERT INTO `playalong`.`user` (`id`, `name`, `email`, `password`, `is_admin`, `dob`, `mobile`, `apt`, `street`, `city`, `country`, `zipcode`, `is_blocked`) VALUES ('2', 'Kedar', 'kdr@gmail.com', '12', '0', '1996-11-07', '4502369523', '325', '1632', 'San Jose', 'US', '95123', '1');
INSERT INTO `playalong`.`user` (`id`, `name`, `email`, `password`, `is_admin`, `dob`, `mobile`, `apt`, `street`, `city`, `country`, `zipcode`, `is_blocked`) VALUES ('3', 'Ashwini', 'ash@gmail.com', '12', '0', '1993-08-23', '1236201596', '253', '1563', 'San Jose', 'US', '95126', '0');
INSERT INTO `playalong`.`user` (`id`, `name`, `email`, `password`, `is_admin`, `dob`, `mobile`, `apt`, `street`, `city`, `country`, `zipcode`, `is_blocked`) VALUES ('4', 'Varsha', 'var@gamil.com', '12', '0', '1993-08-17', '8623015236', '246', '1425', 'San Diego', 'US', '62315', '0');
INSERT INTO `playalong`.`user` (`id`, `name`, `email`, `password`, `is_admin`, `dob`, `mobile`, `apt`, `street`, `city`, `country`, `zipcode`, `is_blocked`) VALUES ('5', 'Belinda', 'bel@gmail.com', '12', '0', '1996-10-21', '1235602315', '365', '1236', 'New York', 'US', '25963', '0');

-- --games----
INSERT INTO `playalong`.`games` (`id`, `game_type_id`, `name`, `date`, `players_count`, `cost`, `apt`, `street`, `city`, `country`, `zipcode`, `created_by`, `created_on`, `owner_id`, `required_skill_level_id`) VALUES ('1', '1', 'Cricmeet', '2019-11-25', '22', '15', '156', '1963', 'San Jose', 'US', '95126', '2', '2019-11-21', '3', '1');
INSERT INTO `playalong`.`games` (`id`, `game_type_id`, `name`, `date`, `players_count`, `cost`, `apt`, `street`, `city`, `country`, `zipcode`, `created_by`, `created_on`, `owner_id`, `required_skill_level_id`) VALUES ('2', '2', 'MegaBasket', '2019-11-20', '10', '25', '206', '1523', 'New York', 'US', '25963', '5', '2019-11-10', '5', '2');
INSERT INTO `playalong`.`games` (`id`, `game_type_id`, `name`, `date`, `players_count`, `cost`, `apt`, `street`, `city`, `country`, `zipcode`, `created_by`, `created_on`, `owner_id`, `required_skill_level_id`) VALUES ('3', '1', 'CricPL', '2019-11-12', '22', '10', '355', '1263', 'San Jose', 'US', '62135', '4', '2019-11-08', '4', '1');

-- --game_enrollment ----
INSERT INTO `playalong`.`game_enrollment` (`id`, `game_id`, `user_id`) VALUES ('1', '1', '3');
INSERT INTO `playalong`.`game_enrollment` (`id`, `game_id`, `user_id`) VALUES ('2', '2', '5');
INSERT INTO `playalong`.`game_enrollment` (`id`, `game_id`, `user_id`) VALUES ('3', '3', '4');
INSERT INTO `playalong`.`game_enrollment` (`id`, `game_id`, `user_id`) VALUES ('4', '1', '2');

-- --class---
INSERT INTO `playalong`.`class` (`id`, `game_type_id`, `name`, `student_count`, `cost`, `apt`, `street`, `city`, `country`, `zipcode`, `created_by`, `created_on`, `instructor_id`) VALUES ('1', '1', 'learncric', '10', '50', '162', '1306 ', 'San Jose', 'US', '95127', '3', '2019-11-25', '3');
INSERT INTO `playalong`.`class` (`id`, `game_type_id`, `name`, `student_count`, `cost`, `apt`, `street`, `city`, `country`, `zipcode`, `created_by`, `created_on`, `instructor_id`) VALUES ('2', '2', 'knowto basket', '20', '15', '632', '5623', 'San Jose', 'US', '95362', '4', '2019-11-15', '4');
INSERT INTO `playalong`.`class` (`id`, `game_type_id`, `name`, `student_count`, `cost`, `apt`, `street`, `city`, `country`, `zipcode`, `created_by`, `created_on`, `instructor_id`) VALUES ('3', '3', 'knowbaseball', '15', '25', '759', '1532', 'San Jose', 'US', '95123', '5', '2019-11-16', '5');

-- --class_schedule --- 
INSERT INTO `playalong`.`class_schedule` (`id`, `class_id`, `day`, `start_time`, `end_time`) VALUES ('1', '1', '2', '2019-11-25 16:30:00', '2019-11-25 17:30:00');
INSERT INTO `playalong`.`class_schedule` (`id`, `class_id`, `day`, `start_time`, `end_time`) VALUES ('2', '2', '5', '2019-11-15 16:00:00', '2019-11-25 17:30:00');
INSERT INTO `playalong`.`class_schedule` (`id`, `class_id`, `day`, `start_time`, `end_time`) VALUES ('3', '3', '3', '2019-11-16 14:30:00', '2019-11-26 16:30:00');

-- --class_enrollment ----
INSERT INTO `playalong`.`class_enrollment` (`id`, `class_id`, `user_id`) VALUES ('1', '1', '3');
INSERT INTO `playalong`.`class_enrollment` (`id`, `class_id`, `user_id`) VALUES ('2', '2', '4');
INSERT INTO `playalong`.`class_enrollment` (`id`, `class_id`, `user_id`) VALUES ('3', '3', '5');
INSERT INTO `playalong`.`class_enrollment` (`id`, `class_id`, `user_id`) VALUES ('4', '1', '4');
INSERT INTO `playalong`.`class_enrollment` (`id`, `class_id`, `user_id`) VALUES ('5', '2', '5');


-- --wallet ----
-- Amount is stored in cents
INSERT INTO `playalong`.`wallet` (`id`, `user_id`, `balance`) VALUES ('1', '1', '20');
INSERT INTO `playalong`.`wallet` (`id`, `user_id`, `balance`) VALUES ('2', '2', '196');
INSERT INTO `playalong`.`wallet` (`id`, `user_id`, `balance`) VALUES ('3', '3', '362');
INSERT INTO `playalong`.`wallet` (`id`, `user_id`, `balance`) VALUES ('4', '4', '86');
INSERT INTO `playalong`.`wallet` (`id`, `user_id`, `balance`) VALUES ('5', '5', '235');


-- ---wallet_payments ----
INSERT INTO `playalong`.`wallet_payments` (`id`, `transactionId`, `amount`, `wallet_id`, `type`, `status`) VALUES ('1', '84220344368', '10', '4', '1', '1');
INSERT INTO `playalong`.`wallet_payments` (`id`, `transactionId`, `amount`, `wallet_id`, `type`, `status`) VALUES ('2', '42280344368', '20', '5', '1', '1');
INSERT INTO `playalong`.`wallet_payments` (`id`, `transactionId`, `amount`, `wallet_id`, `type`, `status`) VALUES ('3', '42244368856', '12', '5', '1', '2');
INSERT INTO `playalong`.`wallet_payments` (`id`, `transactionId`, `amount`, `wallet_id`, `type`, `status`) VALUES ('4', '65451216821', '31', '4', '1', '1');
INSERT INTO `playalong`.`wallet_payments` (`id`, `transactionId`, `amount`, `wallet_id`, `type`, `status`) VALUES ('5', '39898565161', '15', '3', '1', '1');

-- ---wallet_transactions------
INSERT INTO `playalong`.`wallet_transactions` (`id`, `source_id`, `destination_id`, `amount`, `status`) VALUES ('1', '4', '5', '10', '1');
INSERT INTO `playalong`.`wallet_transactions` (`id`, `source_id`, `destination_id`, `amount`, `status`) VALUES ('2', '5', '3', '12', '1');
INSERT INTO `playalong`.`wallet_transactions` (`id`, `source_id`, `destination_id`, `amount`, `status`) VALUES ('3', '3', '5', '3', '2');
INSERT INTO `playalong`.`wallet_transactions` (`id`, `source_id`, `destination_id`, `amount`, `status`) VALUES ('4', '4', '3', '8', '1');
INSERT INTO `playalong`.`wallet_transactions` (`id`, `source_id`, `destination_id`, `amount`, `status`) VALUES ('5', '3', '5', '3', '1');

-- -complaints----
INSERT INTO `playalong`.`complaints` (`id`, `title`, `description`, `status`, `made_by`, `made_on`, `reviewed_by`, `reviewed_on`, `review_message`) VALUES ('1', 'bad', 'He act very bad', '1', '4', '2019-11-15', '1', '2019-11-20', 'Block User');
INSERT INTO `playalong`.`complaints` (`id`, `title`, `description`, `status`, `made_by`, `made_on`, `reviewed_by`, `reviewed_on`, `review_message`) VALUES ('2', 'abusive', 'He is abusive', '1', '5', '2019-11-19', '1', '2019-11-25', 'Block User');
INSERT INTO `playalong`.`complaints` (`id`, `title`, `description`, `status`, `made_by`, `made_on`, `reviewed_by`, `reviewed_on`, `review_message`) VALUES ('3', 'not trustworthy', 'Didn\'t did his payment', '1', '3', '2019-11-08', '1', '2019-11-21', 'Block User');












