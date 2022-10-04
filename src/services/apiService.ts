import axios, { AxiosRequestConfig } from 'axios';
import endpoints from '../config/endpoint.json';

const client = (token: string | null) => {
  return axios.create({
    baseURL: process.env.REACT_APP_BE_URI || endpoints.apiUrl,
    headers: {
      common: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
};

export const apiClient = {
  get: (url: string) => client(localStorage.getItem('jwt')).get(url),
  post: (url: string, data: unknown, config?: AxiosRequestConfig) =>
    client(localStorage.getItem('jwt')).post(url, data, config),
  patch: (url: string, data: unknown) => client(localStorage.getItem('jwt')).patch(url, data),
  put: (url: string, data: unknown) => client(localStorage.getItem('jwt')).put(url, data),
};
