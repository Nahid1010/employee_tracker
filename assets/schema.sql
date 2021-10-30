-- create database
DROP DATABASE IF EXISTS employeeDB;
CREATE database employeeDB;

-- use database
USE employeeDB;

-- create department table
CREATE TABLE department (
  id INT AUTO_INCREMENT,
  name VARCHAR(30) DEFAULT NULL,
  PRIMARY KEY (id)
);


-- create role table
CREATE TABLE role (
  id INT AUTO_INCREMENT,
  title VARCHAR(30) DEFAULT NULL,
  salary DECIMAL DEFAULT 0,
  department_id INT, 
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id)
);

-- create employee table
CREATE TABLE employee (
  id INT AUTO_INCREMENT,
  first_name VARCHAR(30) DEFAULT NULL,
  last_name VARCHAR(30) DEFAULT NULL,
  role_id INT, 
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);