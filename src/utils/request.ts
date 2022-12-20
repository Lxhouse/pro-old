import axios from 'axios';
const baseUrl = 'http://localhost:9020';
export const $get = (_url: string, data = {}) => {
  return axios.get(baseUrl + _url, data);
};

export const $post = (_url: string, data = {}) => {
  return axios.post(baseUrl + _url, data);
};
