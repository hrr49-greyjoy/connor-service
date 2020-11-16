import moment from 'moment';

export const isAvailableDate = (date, unavailableDates) => {

  if(moment(date).isBefore(moment())) {
    return false;
  }

  if (unavailableDates[date]) {
    return false;
  }
  return true;
};