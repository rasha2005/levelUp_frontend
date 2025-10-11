"use client"

import { changePasswordInstructor, resetPasswordWithOld_Instructor } from "@/app/lib/api/instructorApi";
import { changePasswordUser, resetPasswordWithOld_user } from "@/app/lib/api/userApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Role {
    role:"instructor" | "user",
    type:"normal" | "forgot"
}
interface FormValues {
    current:string;
    newPassword:string;
    confirm: string;
  }
  

function PasswordForm({role , type}:Role) {
    const { register, handleSubmit, setValue ,formState:{errors , isValid},watch} = useForm<FormValues>();
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const router = useRouter();
    

    const changePassword = async(data:FormValues) => {
      const token = localStorage.getItem('otpToken');
        const {current , confirm} = data;
        setResponseMessage(null);
        if(role === 'user') {
          if(type === "normal"){
            const res = await changePasswordUser(current , confirm);
            if (res.data.response.success) {
              toast.success("Password changed successfully!");
          } else {
              toast.error(res.data.response.message || "Password change failed.");
          }

          }else{
            const res = await resetPasswordWithOld_user(confirm , token);
            if(res.data.response.success) {
              toast.success("Password changed successfully. Logging you in...");
              setTimeout(() => {
              router.replace('/user/home');
              }, 1500);
            }else {
              toast.error(res.data.response.message || "Password change failed.");
          }
          }
            
        }else{
          if(type === "normal") {
            const res = await changePasswordInstructor(current , confirm);
            if (res.data.response.success) {
              toast.success("Password changed successfully!");
          } else {
              toast.error(res.data.response.message || "Password change failed.");
          }
          }else{
            const res = await resetPasswordWithOld_Instructor(confirm , token);
            if(res.data.response.success) {
              toast.success("Password changed successfully. Logging you in...");
              setTimeout(() => {
              router.replace('/instructor');
              }, 1500);
            }else {
              toast.error(res.data.response.message || "Password change failed.");
          }
          }
          
        }
    }

    return (
      <>
              <ToastContainer/>
        <form  onSubmit={handleSubmit(changePassword)} className="mt-4" >
        {type !== "forgot" && (
  <div className="mb-4">
    <label
      className="block text-sm font-medium text-gray-700 mr-25"
      htmlFor="current"
    >
      Current Password
    </label>
    <input
      type="password"
      id="current"
      {...register("current", {
        required: "Current password is required",
      })}
      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
    />

    {/* Validation error */}
    {errors.current && (
      <span className="text-red-600">{errors.current.message}</span>
    )}

    {/* Backend response error */}
    {responseMessage === "Incorrect password" && (
      <p className="mt-4 text-sm text-red-700">{responseMessage}</p>
    )}
  </div>
)}

        <div className="mb-4">
            <label 
                className="block text-sm font-medium text-gray-700 mr-25" 
                htmlFor="name"
            >
                
                new password
            </label>
            <input
                type="password"
                id="newPassword"
                {...register('newPassword', { 
                                            required: true, 
                                            minLength: { 
                                              value: 6, 
                                              message: 'Password must be at least 6 characters long' 
                                            } ,
                                            validate: (value) => {
                                                const hasUpperCase = /[A-Z]/.test(value);
                                                const hasLowerCase = /[a-z]/.test(value);
                                                const hasNumber = /\d/.test(value);
                                                const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
                                        
                                                if (!hasUpperCase) {
                                                  return 'Password must contain at least one uppercase letter';
                                                }
                                                if (!hasLowerCase) {
                                                  return 'Password must contain at least one lowercase letter';
                                                }
                                                if (!hasNumber) {
                                                  return 'Password must contain at least one number';
                                                }
                                                if (!hasSpecialChar) {
                                                  return 'Password must contain at least one special character';
                                                }
                                                return true; 
                                              }
                                          })}               
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                
                />

{errors.newPassword && (
  <span className="text-red-600">
    {errors.newPassword.message || 'Password is not strong enough'}
  </span>
)}


        </div>
        <div className="mb-4">
            <label 
                className="block text-sm font-medium text-gray-700 mr-25" 
                htmlFor="name"
            >
                
                confirm password
            </label>
            <input
                type="password"
                id="confirm"
                {...register('confirm', { 
                  required: "Confirm password is required",
                  validate: (value) => value === watch("newPassword") || "Passwords do not match"
                                          })}               
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                
                />

{errors.confirm && (
  <span className="text-red-600">
    {errors.confirm.message || 'Password is not strong enough'}
  </span>
)}

{responseMessage === 'Password changed successfully!' && (
    <p className="mt-4 text-sm text-green-700">
        {responseMessage}
    </p>
)}
        </div>
      
        <button 
                type="submit"
                className="mt-4 bg-[#0F0F0F] text-white px-4 py-2 rounded-full shadow hover:bg-gray-800"
            >
                change password
            </button>
            </form>
            </>
    )
}

export default PasswordForm;