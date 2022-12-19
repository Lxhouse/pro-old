import axios from 'axios';
const baseUrl = 'http://localhost:9020/admin';
export const $get = (_url: string, data = {}) => {
  return axios.get(baseUrl + _url, data);
};
