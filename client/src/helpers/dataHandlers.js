import axios from 'axios';

export const getBadDates = () => {
  return axios.get('/api/camps/1/calendar')
}