import axios from 'axios';
import env from './env';

axios.defaults.baseURL = env.apiPrefix || '';
axios.defaults.timeout = 200000;

axios.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
);

export default axios;
