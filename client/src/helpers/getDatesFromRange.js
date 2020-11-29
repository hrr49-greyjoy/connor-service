import moment from 'moment';

export const getDatesFromRange = (startDate, endDate) => {

  let dates = [];
  let currentDate = moment(startDate);

  while(currentDate.isSameOrBefore(moment(endDate))) {
    dates.push(moment(currentDate));
    currentDate.add(1, 'days');
  }

  return dates;
};

