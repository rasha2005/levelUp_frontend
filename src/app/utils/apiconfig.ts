import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Api = axios.create({
    baseURL: process.env.BASE_URL_BACKEND || 'http://localhost:4000/api',
    withCredentials: true
});


// toast.configure();
Api.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log("Error intercepted:", error);
        if (error.response && error.response.status === 403) {
            console.log("kkkkkkkkkkk");
            toast.error("Your account has been blocked. You have been logged out.", {
                position: "top-center",
                autoClose: 5000, 
            });
            setTimeout(() => {
                window.location.href = '/user/login'; 
            }, 5000); 
        }
        return Promise.reject(error);
    }
);