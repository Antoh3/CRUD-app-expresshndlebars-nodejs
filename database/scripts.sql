create database user_management;
use user_management;
show tables;
CREATE TABLE user (id INT NOT NULL AUTO_INCREMENT,firstname VARCHAR(45) NOT NULL,lastname VARCHAR(45) NOT NULL,email VARCHAR(45) NOT NULL,
phone VARCHAR(45) NOT NULL,comments TEXT NOT NULL,status VARCHAR(45) NOT NULL DEFAULT 'active', PRIMARY KEY(id));
describe user;


insert into user values(
7,'mathew','muli','mathew3@gmail.com',0790904307,'This ia a comment','active' 
);

select * from user;