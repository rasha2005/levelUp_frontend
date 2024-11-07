import { Api } from "@/app/utils/apiconfig";
import { userEndpoints } from "@/app/utils/endpoints/userEndpoints";
import Cookies from "js-cookie"

export const signup = async(name:string , email:string , mobile:string , password:string) => {
    try {
        const response = await Api.post(userEndpoints.createUser, {name, email, mobile, password});
        if(response.data.success === true){
            const token = response.data?.token;
            console.log("jjjjj",token);
            localStorage.setItem("otpToken",token)
            return {success:true}
        }else{
            return {success:false}
        }

    }catch(err) {
        console.log(err);
    }

}

export const verifyUserOtp = async(userOtp:string , token:string | null) => {
    try{

        console.log("otppp" , userOtp);
        console.log("token" , token);

        const response = await Api.post(userEndpoints.verifyOtp , {userOtp , token});
       if(response.data?.authToken){
        Cookies.set('authToken' , response.data.authToken,{
            path: '/', 
            secure: true, 
            sameSite: 'Strict' 
        });
        localStorage.removeItem('otpToken');
       }

        return response
    }catch(err) {
        console.log(err);
    }
}

export const login = async(email:string , password:string) => {
    try {
        const response = await Api.post(userEndpoints.verifyLogin , {email , password});
        console.log("respo" , response )
        if(response.data.response.authToken){
            Cookies.set('authToken' , response.data.response.authToken,{
                path: '/', 
                secure: true, 
                sameSite: 'Strict' 
            });
        }
        return response
    }catch(err) {
        console.log(err);
    }
}

export const getCategoryData = async() => {
    try{
        const response = await Api.get(userEndpoints.getCategory);
        console.log(response);
    }catch(error) {
        console.log(error);
    }
}

export const getUser = async() => {
    try {
        const response = await Api.get(userEndpoints.getUserDetails);
        return response

    }catch(err) {
        console.log(err);
    }
}

export const updateUser = async( id:any ,name:string , email:string , mobile:string) =>  {
    try{
        const response  = await Api.post(userEndpoints.editUserDetails , {id ,name , email , mobile});
        return response

    }catch(err) {
        console.log(err);
    }
}

