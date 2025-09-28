"use client"

import UserHeader from "@/components/user/userHeader";
import { getUser, updateUser } from "@/app/lib/api/userApi";
import { Avatar , AvatarFallback ,AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PasswordForm from "@/components/common/passwordForm";
import ProfileImg from "@/components/common/profileImg";
import UserSidebar from "@/components/user/userSideBar";

interface User {
    name:string;
    email:string;
    mobile:string
}

function UserProfile() {

    const { register, handleSubmit, setValue ,formState:{errors , isValid},watch} = useForm<User>();
    
    const [userId , setUserId] = useState();
    const [isChanged , setIsChanged] = useState<boolean>(false);
    
    const getUserData = async() => {
        const res = await getUser();
        if (res?.data?.response?.user) {
            setUserId(res.data.response.user.id);
            setValue("name", res.data.response.user.name);
            setValue("email", res.data.response.user.email);
            setValue("mobile", res.data.response.user.mobile);
            
        }
       
        
    }

    const handleNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setIsChanged(true);
    }

    const handleMobileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setIsChanged(true);
    }

    const onUserEdit = async(data:User) => {
        const {name , mobile} = data
        if(isChanged) {
        const res = await updateUser( userId ,name , mobile);
        
        if (res?.data?.response?.user) {
            setValue("name", res.data.response.user.name);
            setValue("mobile", res.data.response.user.mobile);
            setIsChanged(false);
            toast.success( res?.data.response.message)
        }else{
            toast.error( res?.data.response.message)
        }
    }

    }
    useEffect(() => {
        getUserData();
    },[]);
    return (
        <>
        <ToastContainer/>
    <UserHeader/>
    <UserSidebar/>
    <div className="min-h-screen flex flex-col">
                
                {/* Top Section */}
                <div className="bg-[#0F0F0F] h-60 relative flex justify-center items-center">
                    {/* Placeholder div for positioning */}
                </div>

                {/* Card Section - Positioned at the bottom of the top section */}
                <div className="flex-grow flex justify-center items-start -mt-20">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-11/12 md:w-3/5 lg:w-1/2  relative z-10">
                        
                        {/* Tabs for profile sections */}
                        <Tabs defaultValue="account">
                            <TabsList className="flex justify-center space-x-6 mb-6">
                                
                                <TabsTrigger value="account">Account</TabsTrigger>
                                <TabsTrigger value="password">Password</TabsTrigger>
                            </TabsList>

                            {/* Profile Tab Content */}
                            <TabsContent value="account">
                               <ProfileImg role="user" />
                                <form  onSubmit={handleSubmit(onUserEdit)} className="mt-4">
                                <div className="mb-4">
                                    <label 
                                        className="block text-sm font-medium text-gray-700 mr-25" 
                                        htmlFor="name"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        {...register('name', {required: true, validate: {notEmpty: value => value.trim() !== '' || 'Name cannot be just spaces'}})}
                                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                                        onChange={handleNameChange}
                                        
                                    />
                                     {errors.name && <span className="text-red-600">This field is required</span>}
                                </div>
                                
                                <div className="mb-4">
                                    <label 
                                        className="block text-sm font-medium text-gray-700 mr-25" 
                                        htmlFor="name"
                                    >
                                        mobile
                                    </label>
                                    <input
                                        type="mobile"
                                        id="mobile"
                                        {...register('mobile', {required: true, pattern: /^[0-9]{10}$/})}
                                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                                        onChange={handleMobileChange}
                                    />
                                      {errors.mobile && <span className="text-red-600">Enter a valid 10-digit mobile number</span>}
                                </div>
                                <button 
                                        type="submit"
                                        className="mt-4 bg-[#0F0F0F] text-white px-4 py-2 rounded-full shadow hover:bg-gray-800"
                                    >
                                        Save Changes
                                    </button>
                                    </form>
                            </TabsContent>

                            {/* Account Tab Content */}
                            
                            {/* Password Tab Content */}
                            <TabsContent value="password">
                                <PasswordForm role={"user"} />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
           
        </>
    )
}

export default UserProfile;