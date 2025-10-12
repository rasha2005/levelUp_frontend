import Image from "next/image";
import {signIn} from "next-auth/react"
import { googleAuthCallback } from "@/app/lib/api/userApi";
import Cookies from "js-cookie";


function GoogleAuth() {
    const handleGoogleSignIn = async() => {
        signIn("google")
    }
    return (
        <>
 <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full py-2 px-4 border rounded-full border-gray-300 bg-white hover:bg-gray-100 focus:outline-none"
        >
            <Image
                src="/images/google.png" 
                alt="Google"
                width={20}
                height={20}
                className="mr-2"
            />
            <span className="text-sm font-medium text-gray-800">Continue with Google</span>
        </button>
        </>
    )
}

export default GoogleAuth;