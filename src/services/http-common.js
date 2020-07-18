import axios from 'axios';
import config from '../config/ClientConfig.json';

export default axios.create({
  baseURL: config.BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});
