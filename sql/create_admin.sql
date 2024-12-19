-- create the database
DROP DATABASE IF EXISTS grading;
CREATE DATABASE grading;

-- select the database
USE grading;

-- create the tables
CREATE TABLE admin
(
adminID int PRIMARY KEY AUTO_INCREMENT,
admin_first_name varchar(100) ,
admin_last_name varchar(45) ,
admin_username varchar(45) ,
admin_password varchar(45) ,
admin_emailaddress varchar(45)
);
