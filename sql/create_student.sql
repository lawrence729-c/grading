-- create the database
DROP DATABASE IF EXISTS grading;
CREATE DATABASE grading;

-- select the database
USE grading;

-- create the tables
CREATE TABLE student
(
  studentID int  PRIMARY KEY AUTO_INCREMENT,
  student_first_name varchar(50), 
  student_last_name varchar(50) ,
  student_emailaddress varchar(50), 
  student_username varchar(45) ,
  student_password varchar(45) ,
  student_performance_report varchar(200)
);
