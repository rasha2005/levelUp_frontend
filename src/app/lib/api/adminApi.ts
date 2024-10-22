import { Api } from "@/app/utils/apiconfig"
import { adminEndpoints } from "@/app/utils/endpoints/adminEndpoints"

export const verifyLogin = async(email:string , password:string) => {
    const res = await Api.post(adminEndpoints.verifyLogin , { email , password} );
    return res
}