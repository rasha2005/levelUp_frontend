import { Api } from "@/app/utils/apiconfig";
import { userEndpoints } from "@/app/utils/endpoints/userEndpoints";
import setToken from "../server/token";

export const signup = async(name:string , email:string , mobile:string , password:string) => {
    try {
        const response = await Api.post(userEndpoints.createUser, {name, email, mobile, password});
        if(response.data.success === true){
            const token = response.data?.token;
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
        const response = await Api.post(userEndpoints.verifyOtp , {userOtp , token});
       if(response.data?.authToken){
        setToken(response.data.authToken);
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
        if(response.data.response.authToken){
            setToken(response.data.response.authToken);
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

export const updateUser = async( id:string | undefined ,name:string  , mobile:string) =>  {
    try{
        const response  = await Api.post(userEndpoints.editUserDetails , {id ,name , mobile});
        return response

    }catch(err) {
        console.log(err);
    }
}

export const getInstructorDetails = async(page:number , limit:number , searchTerm:String | null , category : string) => {
    try{
        const response = await Api.get(userEndpoints.getInstructorDetails, {
            params: { page, limit , searchTerm , category}
          });

          return response;

    }catch(err) {
        console.log(err);
    }
}

export const resendOtpUser = async(token:string | null) => {
    const res = await Api.post(userEndpoints.resendOtp , {token});
    return res;
}

export const changePasswordUser = async(current:string , confirm:string) => {
    const res = await Api.post(userEndpoints.changePassword , {current , confirm});
    return res;
}

export const getInstructorById = async(id:string , token:string | undefined) => {
    
    const res = await Api.get(`${userEndpoints.getInstructor}?id=${id}`, {
        withCredentials: true ,
        params:{token}
    });
    return res;
}

export const payement = async(headers:any , body:any) => {
    const res = await Api.post(userEndpoints.payement , body, { headers });
    return res;
}

export const getBookedSession = async(token:string | undefined) => {
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

export const verifyRoomId = async(roomId:string | string[] | undefined , userId:string) => {
    const res = await Api.get(userEndpoints.verifyRoom ,{
        params:{roomId , userId}
    })
    return res;
}

export const updateRating = async(rating:number|null , id:string) => {
    const res = await Api.post(userEndpoints.rating , {rating , id});
    return res
}

export const googleAuthCallback = async(email:string , name:string , img:string) => {

    const res = await Api.post(userEndpoints.googleAuth, { email, name, img });
    return res  
}

export const addReview = async(instructorId:string , value:string) => {
    const res = await Api.post(userEndpoints.addReview , {instructorId , value})
    return res;
}

export const getRoomStatus = async(roomId:string | string[] | undefined) => {
    const res = await Api.get(userEndpoints.roomStatus,{ params:{roomId}});
    return res;
}

export const getTest = async(slotId:string | string[] | undefined) => {
    const res = await Api.get(userEndpoints.getTest,{ params:{slotId}});
    return res;
}

export const getQuestionById = async(qId:string |undefined) => {
    const res = await Api.get(userEndpoints.getQuestion,{ params:{qId}});
    return res;
}

export const updateTestResult = async(slotId:string |undefined | string[],score:number) => {
    const res = await Api.put(userEndpoints.updateResult,{slotId,score});
    return res;
}

export const getCourseDetails = async(courseId:string |undefined ) => {
    const res = await Api.get(userEndpoints.getCourse,{params:{courseId}});
    return res;
}

export const coursePayement = async(headers:any , body:any) => {
    const res = await Api.post(userEndpoints.coursePayment , body, { headers });
    return res;
}

export const getStudentCourse = async(token:string | undefined) => {
    const res = await Api.get(userEndpoints.studentCourse ,{ params:{token} });
    return res;
}

export const getUserNotification = async() => {
    const res = await Api.get(userEndpoints.getNotification);
    return res;
}

export const clearAllNotifications = async() => {
    const res = await Api.delete(userEndpoints.deleteNotifications);
    return res;
}

export const getHighRatingCourse = async() => {
    const res = await Api.get(userEndpoints.getBannerData);
    return res;
}

export const getLatestCourses = async() => {
    const res = await Api.get(userEndpoints.getLatesetCourse);
    return res;
}

export const getPopularInstrcutors = async() => {
    const res = await Api.get(userEndpoints.getPopularInstructors);
    return res;
}

export const getCourseData = async(page:number , limit:number , searchTerm:String | null , selectedCategory : string, minPrice:number | "", maxPrice:number | "") => {
    const res = await Api.get(userEndpoints.getSearchCourse , {
        params:{page, limit, searchTerm, selectedCategory, minPrice, maxPrice}
    });
    return res;
}

export const raiseCourseTicket = async(thumbnail:string|null , description:string , courseId:string | undefined ,instructorId:string | undefined) => {
    const res = await Api.post(userEndpoints.raiseTicket,{thumbnail , description ,courseId, instructorId});
    return res;
}

export const createQnAData = async(message:string , parentId:string|undefined , courseId:string|undefined) => {
    const res = await Api.post(userEndpoints.createQnA,{message , parentId, courseId});
    return res;
}

export const fetchAllQnADatas = async(courseId:string|undefined) => {
    const res = await Api.get(userEndpoints.fetchQnAData,{params:{courseId}});
    return res;
}

export const fetchAnnouncementDatas = async() => {
    const res = await Api.get(userEndpoints.announcements);
    return res;
}


