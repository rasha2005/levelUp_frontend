import { Api } from "@/app/utils/apiconfig"
import { instructorEndPoint } from "@/app/utils/endpoints/instructorEndpoints"
import Cookies from "js-cookie"
import { Rss } from "lucide-react";
import setToken from "../server/token";
import Event from "@/app/utils/interface/Event";

export const signup  = async(name:string , email:string , mobile:string , password:string) => {
    const response =  await Api.post(instructorEndPoint.createInstructor , {name , email , mobile , password});
    
    if(response.data.response.success === true){
        const token = response.data?.response?.token;
      
        localStorage.setItem("otpToken",token)
        return {success:true}
    }else{
        return {success:false}
    }
}

export const verifyInsructor = async(instructorOtp:string , token:string|null) => {
    const response = await Api.post(instructorEndPoint.verifyOtp , {instructorOtp , token});
    if(response.data.response?.authToken){
        setToken(response.data.response.authToken)
        localStorage.removeItem('otpToken');
    }
    return response;
}

export const login  =  async(email:string , password:string) => {
    const res = await Api.post(instructorEndPoint.verifyLogin , {email , password});
    if(res.data.response?.authToken){
        setToken(res.data.response.authToken)
    }
    return res
}

export const getCategoryData = async() => {
    
    const res = await Api.get(instructorEndPoint.getCategory);
    return res
}

export const updateInstructor = async(description:string , experienceCategory:string ,experienceCertificate:string , resume:string ,specialization:string[] | null) => {
    const res = await Api.post(instructorEndPoint.updateInstructorDetails , {description , experienceCategory ,experienceCertificate , resume ,specialization});
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
    return res;
}

export const resendOtpInsructor = async(token:string | null) => {
    const res = await Api.post(instructorEndPoint.resendOtp , {token});
    return res;
}

export const changePasswordInstructor = async(current:string , confirm:string) => {
    const res = await Api.post(instructorEndPoint.changePassword , {current , confirm});
    return res;
}

export const sessionUpdate = async(event:Event) => {
    const res = await Api.post(instructorEndPoint.updateSession , {event});
    return res;
}

export const getSessionData = async() => {
    const res = await Api.get(instructorEndPoint.getEvents);
    return res
} 

export const deleteEvent = async(id:string) => {
    const res = await Api.delete(instructorEndPoint.deleteEventData , {
        data: { id },});
        return res;
}

export const getSlotList = async() => {
    const res = await Api.get(instructorEndPoint.getSlot);
    return res
}

export const getWallet = async(token:string | undefined) => {
    const res = await Api.get(instructorEndPoint.getWallet ,{
        params:{token}
    })
        return res;

    }

export const getImg = async() => {
       const res = await Api.get(instructorEndPoint.getImg);
       return res
    }  
    
export const verifyInstructorRoomId = async(roomId:string | string[] | undefined , instructorId:string) => {
    const res = await Api.get(instructorEndPoint.verifyRoom , {
        params:{roomId , instructorId}
    })
    return res;
}

export const markInstructorJoined = async(roomId : string | string[] | undefined) => {
    const res = await Api.put(instructorEndPoint.instructorJoined, {
      roomId
    })
    return res;
}

