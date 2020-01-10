import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jmoneyapp.herokuapp.com',
});

export default api;
