"use client"

import { getInstructorDetails, upateInstructoProfile } from "@/app/lib/api/instructorApi";
import Form from "@/components/instructor/Form";
import Navbar from "@/components/instructor/Navbar";
import { Avatar , AvatarFallback ,AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FiPlus } from "react-icons/fi";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import PasswordForm from "@/components/common/passwordForm";
import ProfileImg from "@/components/common/profileImg";

 function Profile() {
   


    const showToast = (message: string, type: "success" | "error" = "success") => {
        if (type === "success") {
            toast.success(message);
        } else {
            toast.error(message);
        }
    };

  
 
    return (
        <>
        <ToastContainer/>
        <Navbar />
        <div className="min-h-screen flex flex-col">
                
                {/* Top Section */}
                <div className="bg-gradient-to-r from-sky-950 to-sky-900 h-60 relative flex justify-center items-center">
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
                                <ProfileImg role="instructor"/>
                                <Form showToast={showToast} />
                            </TabsContent>

                            {/* Account Tab Content */}
                            
                            {/* Password Tab Content */}
                            <TabsContent value="password">
                           <PasswordForm role={"instructor"}/>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
           
        </>
    )
}

export default Profile;