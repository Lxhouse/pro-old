import axios from 'axios';
const baseUrl = 'http://localhost:9020/admin';
export const $get = (_url: string) => {
  return axios.get(baseUrl + _url);
};
