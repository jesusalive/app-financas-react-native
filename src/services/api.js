import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apiappfinancas.herokuapp.com',
});

export default api;
