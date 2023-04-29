DROP DATABASE IF EXISTS elitefour_db;
CREATE DATABASE elitefour_db; --Creates DB

USE elitefour_db; --"Selects" DB 

CREATE TABLE region( --New Table; "Department"
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    region_name VARCHAR(30) NOT NULL
);

CREATE TABLE trainer( --New Table; "Role"
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    trainer_name VARCHAR(30) NOT NULL, --"Title"
    age DEC(5, 2) NOT NULL, --"Salary"
    region_id INT NOT NULL, FOREIGN KEY (region_id) REFERENCES region(id) --"Department ID"
);

CREATE TABLE pokemon( --New Table; "Employee"
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL, --"First Name"
    category VARCHAR(100) NOT NULL, --"Last Name"
    trainer_id INT NOT NULL, FOREIGN KEY (trainer_id) REFERENCES trainer(id), --"Role ID"
    strongest_in_party INT, FOREIGN KEY (strongest_in_party) REFERENCES pokemon(id) --"Manager ID"
);
