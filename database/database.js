const mysql = require('mysql');
const Promise = require('bluebird');

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pizza',
  database: 'calendar'
});

connection = Promise.promisifyAll(connection);

const getUnavailableDates = (id) => {
  return connection.queryAsync('SELECT * FROM reservations WHERE listing_id = ? ', id);
};

const getListingPriceById = (id) => {
  return connection.queryAsync('SELECT price FROM listings WHERE id = ? ', id);
};

module.exports.getListingPriceById = getListingPriceById;
module.exports.getUnavailableDates = getUnavailableDates;
