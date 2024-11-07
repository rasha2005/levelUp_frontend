import axios from "axios";


export const Api = axios.create({
    baseURL: process.env.BASE_URL_BACKEND || 'http://localhost:4000/api',
    withCredentials: true
});


  
    Api.interceptors.response.use(
        (response) => 
        response, 
        async (error) => {
           console.log("Error intercepted:", error);
            if(error.response && error.response.status === 403) {
               console.log("kkkkkkkkkkk")
                alert("your account has been blocked. You have been logged out.")
                window.location.href = '/user/login';
            }
            return Promise.reject(error)
        }
    )
