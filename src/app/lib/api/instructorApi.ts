import { Api } from "@/app/utils/apiconfig"
import { instructorEndPoint } from "@/app/utils/endpoints/instructorEndpoints"

export const signup  = async(name:string , email:string , mobile:string , password:string) => {
    const response =  await Api.post(instructorEndPoint.createInstructor , {name , email , mobile , password});
    console.log("kkkkkkkkkkkkk")
    if(response.data.success === true){
        const token = response.data?.token;
        console.log("jjjjj",token);
        localStorage.setItem("otpToken",token)
        return {success:true}
    }else{
        return {success:false}
    }
}

export const verifyInsructor = async(instructorOtp:string , token:string|null) => {
    const response = await Api.post(instructorEndPoint.verifyOtp , {instructorOtp , token});
    console.log("response" ,response );
    if(response.data.response?.authToken){
        localStorage.setItem('authToken' , response.data.response?.authToken);
        localStorage.removeItem("otpToken");
    }
    return response;
}

export const login =  async(email:string , password:string) => {
    const res = await Api.post(instructorEndPoint.verifyLogin , {email , password});
    
    if(res.data.response?.authToken){
        localStorage.setItem('authToken' , res.data.response?.authToken);
    }
    return res
}