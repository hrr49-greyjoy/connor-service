const Promise = require('bluebird');
const mysql = require('mysql');
const random = require('random');
const moment = require('moment');
const {sql} = require('./config.js');

//THIS SCRIPT USES CREDENTIALS FROM CONFIG
//PLEASE REPLACE CREDENTIALS WITH YOUR LOCAL CREDENTIALS TO RUN

const numberOfDays = 365;

let  connection = mysql.createConnection({
  host     : 'localhost',
  user     : sql.user,
  password : sql.password,
});

connection = Promise.promisifyAll(connection);

const randomBookingGenerator = (dates, connection) => {

  let promises1 = [];

  for (let i = 0; i < dates.length; i++) {
    let chance = random.boolean();
    if (!chance) {
      continue;
    }

    let tripLength = random.int(min =  2, max = 6);

    let check_in = dates[i];
    let check_out = moment(check_in).add(tripLength, 'days').format('YYYY-MM-DD');
    let guests = random.int(min = 1, max = 5);
    let price = 20 * (tripLength + 1);

    let queryString1 = `INSERT INTO RESERVATIONS (check_in, check_out, guests, total_price, listing_id)
    VALUES (?, ?, ?, ?, 1)`;
    promises1.push(connection.queryAsync(queryString1, [check_in, check_out, guests, price]));

    i += tripLength + 1;
  }
  return Promise.all(promises1);
};

const dateGenerator = (numberOfDays) => {
  const dates = [];

  let today = moment();
  for (let i =0; i < numberOfDays; i++) {
    let date = today.format('YYYY-MM-DD');
    dates.push(date);
    today = moment(today).add(1, 'days');
  }
  return dates;
};


connection.queryAsync('DROP DATABASE IF EXISTS calendar;')
.then(() => {
  return connection.queryAsync('CREATE DATABASE calendar;')
})
.then(() => {
  return connection.queryAsync('USE CALENDAR;')
})
.catch((err) => {
  if (err) throw err;
})
.then(() => {
  let queryString = `CREATE TABLE listings (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20),
    description VARCHAR(180),
    price DOUBLE,
    PRIMARY KEY (id)
  );`;
  return connection.query(queryString)
})
.catch((err) => {
  if (err) throw err;
})
.then(() => {
  let queryString = `CREATE TABLE reservations (
    id INT NOT NULL AUTO_INCREMENT,
    check_in DATE,
    check_out DATE,
    guests INT,
    total_price DOUBLE,
    listing_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (listing_id) REFERENCES listings(id)
  );`;
  return connection.queryAsync(queryString);
})
.then(() => {
  let queryString = `INSERT INTO listings (name, description, price)
    VALUES (?, ?, 20);`

    return connection.queryAsync(queryString, ['Mountain Park', 'luxurious glamping spot']);
})
.catch((err) => {
  if (err) throw err;
})
.then(() => {
  //GENERATE BOOKINGS
  let dates = dateGenerator(numberOfDays);
  return randomBookingGenerator(dates, connection);
})
.catch((err) => {
  if (err) throw err;
})
.then(() => {
  connection.end();
})

//generate 365 dates, store in array

//iterate over the array
//  random chance of booking
//  if no, continue
//  otherwise
//