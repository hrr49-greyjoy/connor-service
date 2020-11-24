const Promise = require('bluebird');
const mysql = require('mysql');
const random = require('random');
const moment = require('moment');
const faker = require('faker');


const numberOfDays = 365;

let  connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'pizza',
});

connection = Promise.promisifyAll(connection);

const randomBookingGenerator = (dates, connection, id) => {

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

    let queryString1 = `INSERT INTO reservations (check_in, check_out, guests, total_price, listing_id)
    VALUES (?, ?, ?, ?, ?)`;
    promises1.push(connection.queryAsync(queryString1, [check_in, check_out, guests, price, id]));

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


connection.queryAsync('DROP DATABASE IF EXISTS CALENDAR;')
.then(() => {
  return connection.queryAsync('CREATE DATABASE CALENDAR;')
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
  let queryString = `INSERT INTO listings (name, description, price)
    VALUES (?, ?, ?);`;

  let promises = [];

  for (let i = 0; i < 100; i++) {
    let listingName = faker.address.county();
    let description = faker.company.catchPhrase();
    let price = random.int(min = 20, max = 150);
    promises.push(connection.queryAsync(queryString, [listingName, description, price]));
  }

  return Promise.all(promises);

})
.catch((err) => {
  if (err) throw err;
})
.then(() => {
  //GENERATE BOOKINGS
  let dates = dateGenerator(numberOfDays);
  let promises = [];
  for (let i = 1; i <= 100; i++) {
    promises.push(randomBookingGenerator(dates, connection, i));
  }
  return Promise.all(promises);
})
.catch((err) => {
  if (err) throw err;
})
.then(() => {
  connection.end();
})