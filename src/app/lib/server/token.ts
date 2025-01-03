import Cookies from "js-cookie"

const isProduction:boolean = process.env.NODE_ENV === "production"

function  setToken(authToken:string) {
    Cookies.set('authToken' , authToken,{
        path: '/', 
        domain:'axen.cloud',
        secure: true, 
        sameSite: isProduction ?'none' : 'lax'
    });
}

export default setToken;