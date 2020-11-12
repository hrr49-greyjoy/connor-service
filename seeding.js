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
  let promises2 = [];

  for (let i = 0; i < dates.length; i++) {
    let chance = random.boolean();
    if (!chance) {
      continue;
    }

    let check_in = dates[i];
    let check_out = moment(check_in).add(3, 'days').format('YYYY-MM-DD');
    let guests = random.int(min = 1, max = 5);

    let queryString1 = `INSERT INTO RESERVATIONS (check_in, check_out, guests, total_price, listing_id)
    VALUES (?, ?, ?, 600, 1)`;
    promises1.push(connection.queryAsync(queryString1, [check_in, check_out, guests]));

    let date = moment(check_in);
    for (let i = 0; i < 4; i++) {
      let date_ = date.format('YYYY-MM-DD');
      let queryString2 = `UPDATE dates SET available = ? WHERE date_ = ?`;
      promises2.push(connection.queryAsync(queryString2, [0, date_]));
      date = date.add(1, 'days');
    }
    i += 7;
  }
  return Promise.all(promises1).then(() => Promise.all(promises2));
};

//STORE DATES SO WE CAN ITERATE THROUGH THEM LATER
//TO GENERATE RANDOM BOOKINGS
const dates = [];

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
    PRIMARY KEY (id)
  );`;
  return connection.query(queryString)
})
.then((results) => {
  let queryString = `CREATE TABLE dates (
    id INT NOT NULL AUTO_INCREMENT,
    date_ DATE,
    available BIT,
    price DOUBLE,
    listing_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (listing_id) REFERENCES listings(id)
  );`;
  return connection.queryAsync(queryString)
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
  let queryString = `INSERT INTO listings (name, description)
    VALUES (?, ?);`

    return connection.queryAsync(queryString, ['Mountain Park', 'luxurious glamping spot']);
})
.then(() => {

  let promises = [];
  let today = moment();

  for (let i = 0; i < numberOfDays; i++) {
    let date = today.format('YYYY-MM-DD');
    dates.push(date);

    let queryString = `INSERT INTO dates (date_, available, price, listing_id)
      VALUES (?, 1, 200, 1)`;

    promises.push(connection.queryAsync(queryString, [date]));

    today = moment(today).add(1, 'days');
  }
  return Promise.all(promises);
})
.catch((err) => {
  if (err) throw err;
})
.then(() => {
  //GENERATE BOOKINGS
  return randomBookingGenerator(dates, connection);
})
.catch((err) => {
  if (err) throw err;
})
.then(() => {
  connection.end();
})

