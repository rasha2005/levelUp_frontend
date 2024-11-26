"use client"

import { getUserById } from "@/app/lib/api/adminApi";
import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/admin/Sidebar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface UserData {
    id?:string;
    name:string;
    email:string;
    mobile:string;
   
}

function UserDetails() {
    const [user , setUser] = useState<UserData>()
    const params = useParams();
    const id = params.slug;
const getUser = async() => {

    const res = await getUserById(id);
    if(res.data.response.success === true) {
        setUser(res.data.response.instructor);
    }
}

useEffect(() => {
    getUser();
},[]);

    return(
      
        <div className="h-screen ">
        <div className="w-full">
            <Navbar />
        </div>
        <div className="flex">
            <div className="w-[250px]">
                <Sidebar />
            </div>
<div className="flex-1 p-10 bg-white shadow-md rounded-lg m-20">
                        <h1 className="text-3xl font-bold mb-6">user Details</h1>
                        
                        {/* Instructor Information Card */}
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
                            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                            <p><span className="font-semibold">Name:</span> {user?.name}</p>
                            <p><span className="font-semibold">Email:</span> {user?.email}</p>
                            <p><span className="font-semibold">Phone:</span> {user?.mobile}</p>
                        </div>
                        </div>
                        </div>
                        </div>
        
    )
}

export default UserDetails;