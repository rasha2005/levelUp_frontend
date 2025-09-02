import { Api } from "@/app/utils/apiconfig"
import { adminEndpoints } from "@/app/utils/endpoints/adminEndpoints"
import setToken from "../server/token";


export const verifyLogin = async(email:string , password:string) => {
    const res = await Api.post(adminEndpoints.verifyLogin , { email , password} );
    if(res.data.response.success === true) {
        const token = res.data.response?.token;
        setToken(token);
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
    
    const res = await Api.post(adminEndpoints.createCategories , {data});
    return res;
}

export const getCatData = async() => {
    
    const res = await Api.get(adminEndpoints.getCategoryData);
    return res;
}

export const editCatData = async(catName:string , id:string | string[] | undefined) => {
    const res = await Api.post(adminEndpoints.editCategoryData , {catName , id});
    return res;
}

export const deleteCatData = async(id:string) => {
    
    const res = await Api.delete(adminEndpoints.deleteCategoryData, {
        data: { id },});
        return res;
}

export const blockUser = async(id:string) => {
    
    const res = await Api.post(adminEndpoints.blockUser ,{
        data: { id },});

     return res;   
}


export const getInstructorById = async(id:string|string[] | undefined) => {
  
    const res = await Api.get(`${adminEndpoints.getInstructor}?id=${id}`);
    return res
}

export const approveInstructor = async(id:string | undefined) => {
    const res = await Api.post(adminEndpoints.adminApprovel , {id});
    return res;
}

export const cancelApprovel = async(id:string | undefined) => {
    const res = await Api.post(adminEndpoints.cancelAdminApprovel, {id});
    return res;
}

export const getUserById = async(id:string) => {
    
    const res = await Api.get(`${adminEndpoints.getUser}?id=${id}`);
    return res
}

export const fetchDetails = async() => {
    const res = await Api.get(adminEndpoints.fetchDetails)
    return res
}

export const getTransaction = async() => {
    const res = await Api.get(adminEndpoints.fetchTransaction);
    return res
}