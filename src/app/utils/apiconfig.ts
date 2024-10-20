import axios from "axios";

export const Api = axios.create({
    baseURL: process.env.BASE_URL_BACKEND || 'http://localhost:4000/api',
    withCredentials: true
});