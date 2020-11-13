const mysql = require('mysql');
const {sql} = require('../config.js');
const Promise = require('bluebird');

let connection = mysql.createConnection({
  host: 'localhost',
  user: sql.user,
  password: sql.password,
  database: 'calendar'
});

connection = Promise.promisifyAll(connection);

const getUnavailableDates = (id) => {
  return connection.queryAsync('SELECT * FROM reservations WHERE listing_id = ? ', id);
};

getListingPriceById = (id) => {
  return connection.queryAsync('SELECT price FROM listings WHERE id = ? ', id);
};

module.exports.getListingPriceById = getListingPriceById;
module.exports.getUnavailableDates = getUnavailableDates;
