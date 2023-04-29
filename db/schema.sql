DROP DATABASE IF EXISTS elitefour_db;
CREATE DATABASE elitefour_db; 

USE elitefour_db; 

CREATE TABLE region(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    region_name VARCHAR(30) NOT NULL
);

CREATE TABLE trainer( 
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    trainer_name VARCHAR(30) NOT NULL,
    age DEC(5, 2) NOT NULL,
    region_id INT NOT NULL, FOREIGN KEY (region_id) REFERENCES region(id)
);

CREATE TABLE pokemon( 
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    category VARCHAR(100) NOT NULL,
    trainer_id INT NOT NULL, FOREIGN KEY (trainer_id) REFERENCES trainer(id),
    strongest_in_party INT, FOREIGN KEY (strongest_in_party) REFERENCES pokemon(id)
);
