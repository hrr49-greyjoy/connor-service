import moment from 'moment';

export const isValidSubmission = (checkIn, checkOut, unavailableDates) => {

  let startDate = moment(checkIn);

  while(startDate.isSameOrBefore(moment(checkOut))) {
    if (unavailableDates[startDate.format('YYYY-MM-DD')]) {
      return false;
    }

    startDate.add(1, 'days');
  }
  return true;
}