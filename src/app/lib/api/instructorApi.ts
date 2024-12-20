import { Api } from "@/app/utils/apiconfig"
import { instructorEndPoint } from "@/app/utils/endpoints/instructorEndpoints"
import Cookies from "js-cookie"
import { Rss } from "lucide-react";

export const signup  = async(name:string , email:string , mobile:string , password:string) => {
    const response =  await Api.post(instructorEndPoint.createInstructor , {name , email , mobile , password});
    console.log("kkkkkkkkkkkkk",response)
    if(response.data.response.success === true){
        const token = response.data?.response?.token;
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
    const isProduction:boolean = process.env.NODE_ENV === "production"

    if(response.data.response?.authToken){
        Cookies.set('authToken' , response.data.response?.authToken,{
            path: '/', 
            domain:'axen.cloud',
            secure: true, 
            sameSite: isProduction ?'none' : 'lax'
        });
      
        localStorage.removeItem('otpToken');
    }
    return response;
}

export const login  =  async(email:string , password:string) => {
    const res = await Api.post(instructorEndPoint.verifyLogin , {email , password});
    const isProduction:boolean = process.env.NODE_ENV === "production"
console.log("node_env" ,  process.env.NODE_ENV);
console.log("cookiedomain" , process.env.COOKIE_DOMAIN);
    if(res.data.response?.authToken){
        Cookies.set('authToken' , res.data.response?.authToken,{
            path: '/', 
            domain:'axen.cloud',
            secure: true, 
            sameSite: isProduction ?'none' : 'lax'
        });
    }
    return res
}

export const getCategoryData = async() => {
    console.log("in the api");
    const res = await Api.get(instructorEndPoint.getCategory);
    return res
}

export const updateInstructor = async(description:string , experienceCategory:string ,experienceCertificate:string , resume:string) => {
    const res = await Api.post(instructorEndPoint.updateInstructorDetails , {description , experienceCategory ,experienceCertificate , resume});
    return res;
}

export const getInstructorDetails = async() => {
    const res = await Api.get(instructorEndPoint.getDetailsById);
    return res;
}

export const editInstructorDetails = async(name:string , mobile:string) => {
    const res = await Api.post(instructorEndPoint.editInstrtuctor , {name , mobile});
    return res
}

export const upateInstructoProfile = async(img:string) => {
    const res = await Api.post(instructorEndPoint.updateImg , {img});
    console.log("ress" , res);
    return res;
}

export const resendOtpInsructor = async(token:any) => {
    const res = await Api.post(instructorEndPoint.resendOtp , {token});
    return res;
}

export const changePasswordInstructor = async(current:string , confirm:string) => {
    const res = await Api.post(instructorEndPoint.changePassword , {current , confirm});
    return res;
}

export const sessionUpdate = async(event:any) => {
    console.log("jjj" , event) ;
    const res = await Api.post(instructorEndPoint.updateSession , {event});
    return res;
}

export const getSessionData = async() => {
    console.log("ggg");
    const res = await Api.get(instructorEndPoint.getEvents);
    return res
} 

export const deleteEvent = async(id:any) => {
    const res = await Api.delete(instructorEndPoint.deleteEventData , {
        data: { id },});
        return res;
}

export const getSlotList = async() => {
    console.log('kk')
    const res = await Api.get(instructorEndPoint.getSlot);
    return res
}

export const getWallet = async(token:any) => {
    console.log('kkk');
    const res = await Api.get(instructorEndPoint.getWallet ,{
        params:{token}
    })
        return res;

    }

export const getImg = async() => {
       const res = await Api.get(instructorEndPoint.getImg);
       return res
    }  
    
export const verifyInstructorRoomId = async(roomId:any , instructorId:any) => {
    const res = await Api.get(instructorEndPoint.verifyRoom , {
        params:{roomId , instructorId}
    })
    return res;
}

