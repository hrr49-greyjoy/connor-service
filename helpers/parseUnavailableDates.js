const moment = require('moment');

const parseUnavailableDates = (reservations) => {

  let dates = {};

  for (let i = 0; i < reservations.length; i ++) {
    let currentRes = reservations[i];

    let currentDate =  moment(currentRes.check_in);
    let lastDay = moment(currentRes.check_out);

    while(currentDate.format('YYYY-MM-DD') !== lastDay.format('YYYY-MM-DD')) {
      dates[currentDate.format('YYYY-MM-DD')] = true;
      currentDate = moment(currentDate).add(1, 'days');
    }
    dates[lastDay.format('YYYY-MM-DD')] = true;
  }
  return dates;
};

module.exports = parseUnavailableDates;
