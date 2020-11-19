const moment = require('moment');

const getPricing = function(data, query) {
  let result = {};

  result.price_per_night = data[0].price;
  if (!query.check_in) {
    result.total_price = data[0].price;
    return result;
  }
  let count = 1;
  let start = moment(query.check_in);
  let end = moment(query.check_out);

  while(start.format('YYYY-MM-DD') !== end.format('YYYY-MM-DD')) {
    count++
    start.add(1, 'days');
  }
  result.total_price = count * data[0].price;

  return result;
};

module.exports = getPricing;
