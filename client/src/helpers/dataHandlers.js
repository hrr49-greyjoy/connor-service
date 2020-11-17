import axios from 'axios';

export const getBadDates = () => {
  return axios.get('/api/camps/1/calendar')
}

export const getPricingByDates = (checkIn, checkOut, guests) => {
  return axios.get(`/api/camps/1/reservation?check_in=${checkIn}&check_out=${checkOut}&guests=${guests}`);
};