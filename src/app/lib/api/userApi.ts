import { Api } from "@/app/utils/apiconfig";
import { userEndpoints } from "@/app/utils/endpoints/userEndpoints";


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
        return response
    }catch(err) {
        console.log(err);
    }
}

export const login = async(email:string , password:string) => {
    try {
        const response = await Api.post(userEndpoints.verifyLogin , {email , password});
        return response
    }catch(err) {
        console.log(err);
    }
}