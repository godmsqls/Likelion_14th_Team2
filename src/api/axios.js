import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || 'https://kwu-graduation.duckdns.org'

const api = axios.create({
  baseURL: import.meta.env.PROD ? BACKEND_URL : '',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;