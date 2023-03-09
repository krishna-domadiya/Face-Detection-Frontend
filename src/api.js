import axios from 'axios';
// require('dotenv').config()

const api = axios.create({
    baseURL: process.env.VUE_APP_API_ENDPOINT,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) config.headers.Authorization = token;

    return config;
})

export default api;
  