import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userEndpoints } from "./endpoints/userEndpoints";
import setToken from "../lib/server/token";
import { logoutUser } from "../lib/server/logout";



export const Api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_BACKENDAPI ,
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
                const newAccessToken = refreshResponse.data?.response?.authToken;
                
                if (newAccessToken) {
                    console.log("set new acess token",newAccessToken);
                    setToken(newAccessToken); 
                    error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return Api.request(error.config); 
                }
                
               
            } catch (refreshError) {
                console.error("Refresh token failed:", refreshError);

               
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
            await logoutUser()
            toast.error("Your account has been blocked. You have been logged out.", {
                position: "top-center",
                autoClose: 5000, 
            });
            setTimeout(() => {
                window.location.href = '/user/login'; 
            }, 5000); 
        }
        if(error.response && error.response.status === 401 && error.response.data.message === 'Unauthorized access'){
            console.log("authToken not provided");
        }
        return Promise.reject(error);
    }
);