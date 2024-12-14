import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userEndpoints } from "./endpoints/userEndpoints";


export const Api = axios.create({
    baseURL: process.env.BASE_URL_BACKEND || 'http://localhost:4000/api',
    withCredentials: true
});


// toast.configure();
Api.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log("Error intercepted:", error);
        if(error.response.status === 401 && error.response.data.message === 'Token expired'){
            try {
               
                const refreshResponse = await Api.post(userEndpoints.refreshToken); 
                const newAccessToken = refreshResponse.data.authToken;

                
                document.cookie = `authToken=${newAccessToken}; path=/;`;
                
                // Retry the failed request with the new token
                error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return Api.request(error.config);
            } catch (refreshError) {
                console.error("Refresh token failed:", refreshError);

                // If refreshing fails, log out the user
                toast.error("Session expired. Please log in again.", {
                    position: "top-center",
                    autoClose: 5000,
                });
                setTimeout(() => {
                    window.location.href = '/user/login';
                }, 5000);
            }
        }
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