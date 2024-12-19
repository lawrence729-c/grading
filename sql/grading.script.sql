-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema grading
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema grading
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `grading` DEFAULT CHARACTER SET utf8 ;
USE `grading` ;

-- -----------------------------------------------------
-- Table `grading`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `grading`.`admin` (
  `adminID` INT NOT NULL AUTO_INCREMENT,
  `admin_first_name` VARCHAR(100) NULL,
  `admin_last_name` VARCHAR(45) NULL,
  `admin_username` VARCHAR(45) NULL,
  `admin_password` VARCHAR(45) NULL,
  `admin_emailaddress` VARCHAR(45) NULL,
  PRIMARY KEY (`adminID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `grading`.`student`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `grading`.`student` (
  `studentID` INT NOT NULL AUTO_INCREMENT,
  `student_first_name` VARCHAR(50) NULL,
  `student_last_name` VARCHAR(50) NULL,
  `student_emailaddress` VARCHAR(50) NULL,
  `student_username` VARCHAR(45) NULL,
  `student_password` VARCHAR(45) NULL,
  `student_performance_report` VARCHAR(200) NULL,
  PRIMARY KEY (`studentID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `grading`.`counselor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `grading`.`counselor` (
  `counselorID` INT NOT NULL AUTO_INCREMENT,
  `counselor_first_name` VARCHAR(45) NULL,
  `counselor_last_name` VARCHAR(45) NULL,
  `counselor_emailaddress` VARCHAR(45) NULL,
  `counselor_username` VARCHAR(45) NULL,
  `counselor_password` VARCHAR(45) NULL,
  `student_studentID` INT NOT NULL,
  PRIMARY KEY (`counselorID`, `student_studentID`),
  INDEX `fk_counselor_student1_idx` (`student_studentID` ASC) VISIBLE,
  CONSTRAINT `fk_counselor_student1`
    FOREIGN KEY (`student_studentID`)
    REFERENCES `grading`.`student` (`studentID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `grading`.`assignments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `grading`.`assignments` (
  `assignmentsID` INT NOT NULL AUTO_INCREMENT,
  `assignments_name` VARCHAR(45) NULL,
  `assignments_status` VARCHAR(45) NULL,
  `assignments_file_type` VARCHAR(45) NULL,
  `assignments_due_date` DATE NULL,
  `assignments_weight_score` INT NULL,
  `admin_adminID` INT NOT NULL,
  PRIMARY KEY (`assignmentsID`),
  INDEX `fk_assignments_admin1_idx` (`admin_adminID` ASC) VISIBLE,
  CONSTRAINT `fk_assignments_admin1`
    FOREIGN KEY (`admin_adminID`)
    REFERENCES `grading`.`admin` (`adminID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `grading`.`assignments_has_student`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `grading`.`assignments_has_student` (
  `assignments_assignmentsID` INT NOT NULL,
  `student_studentID` INT NOT NULL,
  `student_grade` INT NULL,
  `grade_type` VARCHAR(50) NULL,
  `grading_method` VARCHAR(50) NULL,
  PRIMARY KEY (`assignments_assignmentsID`, `student_studentID`),
  INDEX `fk_assignments_has_student_student1_idx` (`student_studentID` ASC) VISIBLE,
  INDEX `fk_assignments_has_student_assignments1_idx` (`assignments_assignmentsID` ASC) VISIBLE,
  CONSTRAINT `fk_assignments_has_student_assignments1`
    FOREIGN KEY (`assignments_assignmentsID`)
    REFERENCES `grading`.`assignments` (`assignmentsID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_assignments_has_student_student1`
    FOREIGN KEY (`student_studentID`)
    REFERENCES `grading`.`student` (`studentID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
