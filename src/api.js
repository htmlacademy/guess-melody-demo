import axios from 'axios';

const api = axios.create({
  baseURL: `https://es31-server.appspot.com/guess-melody`,
  timeout: 1000 * 5,
  withCredentials: true,
});

export default api;
