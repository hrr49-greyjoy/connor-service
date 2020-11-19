const moment = require('moment');

module.exports = {
  checkIn: '2020-11-15',
  checkOut: '2020-11-18',
  unavailableDates: {
    "2020-11-17": true,
    "2020-11-18": true,
    "2020-11-19": true,
    "2020-11-21": true,
    "2020-11-22": true,
  },
  selectedMonth: moment(),
  now: moment(),
  currentPicker: 'checkIn'
}