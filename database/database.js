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

module.exports.getUnavailableDates = getUnavailableDates;
