DROP DATABASE IF EXISTS calendar;

CREATE DATABASE calendar;

USE CALENDAR;

CREATE TABLE listings (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(20),
  description VARCHAR(180),
  price DOUBLE,
  PRIMARY KEY (id)
);

CREATE TABLE reservations (
  id INT NOT NULL AUTO_INCREMENT,
  check_in DATE,
  check_out DATE,
  guests INT,
  total_price DOUBLE,
  listing_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (listing_id) REFERENCES listings(id)
);

