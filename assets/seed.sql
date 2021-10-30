-- use database
USE employeeDB;

-- populate department table
DELETE FROM department;
INSERT INTO department (name) VALUES
('Sales'),
('Engineering'),
('Operations'),
('Human Resources');

-- populate role table
DELETE FROM role;
INSERT INTO role (title, salary, department_id) VALUES
('Sales Manager', 150000, 1),
('Sales Person', 100000, 1),
('Eng Manager', 180000, 2),
('Eng TL', 180000, 2),
('Engineer', 120000, 2),
('Op Manager', 120000, 3),
('Op TL', 100000, 3),
('Op Technician', 75000, 3),
('HR Manager', 70000, 4),
('HR Staff', 70000, 4);

-- populate employee table
DELETE FROM employee;
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Sam', 'Taylor', 1, NULL),
('Peter', 'Wood', 2, 1),
('Rob', 'Indigo', 3, NULL),
('Steve', 'George', 4, 3),
('William', 'Nash', 5, 4),
('Eric', 'Bates', 6, NULL),
('Sal', 'Scaleon', 7, 6),
('Howard', 'England', 8, 7),
('Emma', 'Johnson', 9, NULL),
('Lauren', 'Yates', 10, 9);