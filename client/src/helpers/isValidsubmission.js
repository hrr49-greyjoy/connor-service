
export const isValidSubmission = (checkIn, checkOut, unavailableDates) => {
  if (moment(checkOut).isBefore(checkOut)) {
    console.log('INVALID SUBMISSION: check in before checkout');
  }

  if(moment(checkIn).isBefore(moment())) {
    console.log('INVALID SUBMISSION: check out is before current date');
  }

  let startDate = moment(checkIn);

  while(startDate.isSameOrBefore(checkOut)) {

    if (unavailableDates[startDate.format('YYYY-MM-DD')]) {
      console.log('INVALID SUBMISSION: date-range contains reserved date');
      break;
    }

    startDate.add(1, 'days');
  }
}