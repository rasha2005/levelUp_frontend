import { Api } from "@/app/utils/apiconfig";
import { userEndpoints } from "@/app/utils/endpoints/userEndpoints";
import Cookies from "js-cookie"
import { NextResponse } from "next/server";

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
        return response; 
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

export const updateUser = async( id:any ,name:string  , mobile:string) =>  {
    try{
        const response  = await Api.post(userEndpoints.editUserDetails , {id ,name , mobile});
        return response

    }catch(err) {
        console.log(err);
    }
}

export const getInstructorDetails = async(page:number , limit:number , searchTerm:String | null , category : any) => {
    try{
        const response = await Api.get(userEndpoints.getInstructorDetails, {
            params: { page, limit , searchTerm , category}
          });

          return response;

    }catch(err) {
        console.log(err);
    }
}

export const resendOtpUser = async(token:any) => {
    const res = await Api.post(userEndpoints.resendOtp , {token});
    return res;
}

export const changePasswordUser = async(current:string , confirm:string) => {
    const res = await Api.post(userEndpoints.changePassword , {current , confirm});
    return res;
}

export const getInstructorById = async(id:any) => {
    
    const res = await Api.get(`${userEndpoints.getInstructor}?id=${id}`, {
        withCredentials: true 
    });
    return res;
}

export const payement = async(headers:any , body:any) => {
    const res = await Api.post(userEndpoints.payement , body, { headers });
    return res;
}

export const getBookedSession = async(token:any) => {
    console.log("lll" , token);
    const res = await Api.get(userEndpoints.getSlots , {
        params:{token}
    })
    return res;
}

export const upateUserProfile = async(img:string) => {
    const res = await Api.post(userEndpoints.setImg , {img});
    return res
}

export const getImg = async() => {
    const res = await Api.get(userEndpoints.getImg)
    return res
}

export const verifyRoomId = async(roomId:any , userId:any) => {
    const res = await Api.get(userEndpoints.verifyRoom ,{
        params:{roomId , userId}
    })
    return res;
}

export const updateRating = async(rating:any , id:any) => {
    const res = await Api.post(userEndpoints.rating , {rating , id});
    return res
}

export const googleAuthCallback = async(email:any , name:any , img:any) => {
    console.log("hereee", email, name, img);

    const res = await Api.post(userEndpoints.googleAuth, { email, name, img });
    console.log("ressssa", res.data?.response?.authToken);

  const authToken = res.data?.response?.authToken;
  
  

    if (authToken) {
        return new Response(null, {
            headers: {
                'Set-Cookie': `authToken=${authToken};  Path=/; SameSite=Lax; `, 
                Location: '/',
            },
            status: 302, // Redirect to home
        });
    }

    

    // Handle case where token is not received
    return NextResponse.json({ error: 'Token not received' }, { status: 400 });
}