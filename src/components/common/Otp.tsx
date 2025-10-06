"use client"

import { useEffect, useState } from "react";
import Layout from "../header/layout";
import { resendOtpUser, verifyUserOtp } from "@/app/lib/api/userApi";
import { resendOtpInsructor, verifyInsructor } from "@/app/lib/api/instructorApi";
import { useRouter } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";


interface OtpProps {
    role: 'user' | 'instructor'; 
  }

  const Otp: React.FC<OtpProps> = ({ role }) => {
    const [timer, setTimer] = useState(20);
    const [otp , setOtp] = useState(new Array(6).fill(""));
    const router = useRouter();

    const handleChange = (ele:React.ChangeEvent<HTMLInputElement> , index:number) => {
      
        const value = ele.target.value;
        setOtp([...otp.map((data , idx) => (idx === index ? value :data))]);

        const next = ele.target.nextElementSibling as HTMLInputElement | null;
        if (next) {
          next.focus();
        }


    }

    const verifyOtp = async() =>{ 
        const tempOtp = otp.join('');
        setOtp(new Array(6).fill(""));
        const token = localStorage.getItem('otpToken');
        if(role === "user") {
            const res = await verifyUserOtp(tempOtp , token);
            if(res?.data?.success === true) {
                router.push('/user/home');
            }else{
                toast.error(res?.data?.message);
            }
        }else{
            const res = await verifyInsructor(tempOtp , token);
        if(res.data.response.success === true) {
            router.push('/instructor/validation')
        }else{
            toast.error(res.data.response.message);
        }
        }
    }

    const handleResendOtp = async() => {
        setTimer(30);
        const token = localStorage.getItem('otpToken');
        if(role === "user") {
            const res = await resendOtpUser(token);
            if(res?.data?.response?.success === true) {
               toast.success(res.data.response.message)
            }else{
                toast.error(res.data.response.message);
            }
        }else{
            const res = await resendOtpInsructor(token);
        if(res.data.response.success === true) {
            toast.success(res.data.response.message);
        }else{
            toast.error(res.data.response.message);
        }
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if(timer > 0) {
                setTimer(timer - 1);
            }
        },1000)

        return () => clearInterval(interval);
    },[timer ]);
    return (
        <>
        <ToastContainer/>
       <Layout>

       <div className="flex flex-col items-center justify-center min-h-[80vh]  ">
            <div className="bg-white p-6 rounded shadow-md max-w-md w-full text-center">
                <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
                <p className="text-gray-500 text-sm mb-4">
                   OTP will expire after 15 minutes.
                </p>

                {/* Timer for Resend (optional) */}
                <p className="text-gray-500 text-sm mb-4">
                    Time remaining to resend OTP: {timer} seconds
                </p>
                <div className="flex justify-center space-x-2 mb-4 mt-8">
                   
                    {otp.map((data , index) => (
                        <input
                            key={index}
                            type="text"
                            value={data}
                            maxLength={1} 
                            minLength={1} 
                            onChange={(e) => handleChange(e , index)}
                            className="w-10 h-10 border border-gray-300 text-center rounded focus:outline-none focus:border-blue-500"
                        />
                    ))}
                </div>
                {/* Timer */}
                
                
               

                {/* Verify OTP Button */}
                <button
                    className="w-full py-2 px-4 bg-green-500 text-white rounded font-semibold hover:bg-green-600 transition-colors mt-8"
                    onClick={verifyOtp}
                >
                    Verify OTP
                </button>
                <button
                    className={`text-blue-500 text-sm cursor-pointer mt-2 ${timer > 0 ? 'opacity-50' : ''}`}
                    onClick={timer === 0 ? handleResendOtp : undefined} // Only allow click if timer is 0
                >
                    Resend OTP
                </button>
            </div>
        </div>

       </Layout>
        </>
    )
}
export default Otp;
