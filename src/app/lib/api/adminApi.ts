import { Api } from "@/app/utils/apiconfig"
import { adminEndpoints } from "@/app/utils/endpoints/adminEndpoints"
import Cookies from "js-cookie"


export const verifyLogin = async(email:string , password:string) => {
    const res = await Api.post(adminEndpoints.verifyLogin , { email , password} );
    if(res.data.response.success === true) {
        const token = res.data.response?.token;
        Cookies.set('authToken' , token , {
            path: '/', 
            secure: true, 
            sameSite: 'Strict' 
        });
    }
    return res
}

export const getUsers = async() => {
    const res = await Api.get(adminEndpoints.getUserData);
    return res
}

export const getInstructor = async() => {
    const res = await Api.get(adminEndpoints.getInstructorData)
    return res;
}

export const createCategory = async(data:string) => {
    console.log("ll" , data);
    const res = await Api.post(adminEndpoints.createCategories , {data});
    return res;
}

export const getCatData = async() => {
    console.log("kkkkkkkk");
    const res = await Api.get(adminEndpoints.getCategoryData);
    return res;
}

export const editCatData = async(catName:string , id:any) => {
    const res = await Api.post(adminEndpoints.editCategoryData , {catName , id});
    return res;
}

export const deleteCatData = async(id:any) => {
    console.log("iddd" , id);
    const res = await Api.delete(adminEndpoints.deleteCategoryData, {
        data: { id },});
        return res;
}

export const blockUser = async(id:any) => {
    console.log("oo" , id);
    const res = await Api.post(adminEndpoints.blockUser ,{
        data: { id },});

     return res;   
}