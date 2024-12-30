"use client"



import { approveInstructor, cancelApprovel, getInstructorById } from "@/app/lib/api/adminApi";
import Navbar from "@/components/admin/Navbar"
import Sidebar from "@/components/admin/Sidebar"
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";

interface InstructorData {
    id?:string;
    name:string;
    email:string;
    mobile:string;
    description?:string;
    experience?:string;
    resume?:string;
    category?:string;
    isApproved?:boolean;

}

function InstructorDetailpage() {
    const [instructor , setInstructor] = useState<InstructorData>()
    const params = useParams();
    const id = params.slug;

    const handleSubmit = async() => {
        try {

            if(instructor?.isApproved) {
                const res = await cancelApprovel(instructor?.id);
                if(res.data.response.success === true) {
                    setInstructor(prev => prev ? { ...prev, isApproved: false } : undefined);
                    toast.success(res.data.response.message);
                }else{
                    toast.error(res.data.response.message);
                }

            }else{
                const res = await approveInstructor(instructor?.id);
                if(res.data.response.success === true) {
                    setInstructor(prev => prev ? { ...prev, isApproved: true } : undefined);
                    toast.success(res.data.response.message);
                }else{
                    toast.error(res.data.response.message);
                }
            }
        }catch(err) {
            console.log(err);
        }
    }

    const getInstructorData = async() => {
        try {
            
            const res = await getInstructorById(id);
            
            if(res.data.response.success === true) {
                setInstructor(res.data.response.instructor);
            }

        }catch(err) {
            console.log(err);
        }
    }

   useEffect(() => {
    getInstructorData();
   },[])
    return (
        <>  
        <ToastContainer />
        <div className="h-screen ">
        <div className="w-full">
            <Navbar />
        </div>
        <div className="flex">
            <div className="w-[250px]">
                <Sidebar />
            </div>

            <div className="flex-1 p-10 bg-white shadow-md rounded-lg m-20">
                        <h1 className="text-3xl font-bold mb-6">Instructor Details</h1>
                        
                        {/* Instructor Information Card */}
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
                            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                            <p><span className="font-semibold">Name:</span> {instructor?.name}</p>
                            <p><span className="font-semibold">Email:</span> {instructor?.email}</p>
                            <p><span className="font-semibold">Phone:</span> {instructor?.mobile}</p>
                        </div>

                        {/* Instructor Bio */}
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
                            <h2 className="text-xl font-semibold mb-4">Bio</h2>
                            {instructor?.description ? <p>{instructor?.description}</p> : <p>not added</p>}
                            
                        </div>

                        {/* Course Information */}
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Other</h2>
                            {instructor?.category || instructor?.experience || instructor?.resume ? (
                                    <div>
                                        {instructor.category ? <p><span className="font-semibold"> Category:</span> {instructor?.category}</p> : <p></p>}
                                        {instructor?.experience ? <p>
                                            View 
                                            <Link href={instructor?.experience} className="text-blue-600 font-semibold hover:underline hover:text-blue-800 transition duration-200 ease-in-out">
                                                <span className="font-semibold"> experience certificate</span>
                                            </Link>
                                        </p> : <p></p>}
                                        {instructor.resume ? <p>
                                                View 
                                                <Link href={instructor?.resume} className="text-blue-600 font-semibold hover:underline hover:text-blue-800 transition duration-200 ease-in-out">
                                                    <span className="font-semibold"> resume</span>
                                                </Link>
                                            </p> : <p></p>}
                                        
                                    </div>
                                ) : (
                                    <p>Not added</p>
                                )}
                        </div>
                        <div className="flex justify-end">
                            
    <button onClick={handleSubmit} className={`${
        instructor?.isApproved ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
    } text-white font-semibold py-2 px-4 rounded transition duration-200 ease-in-out mt-4`}>
    {instructor?.isApproved ? "cancel Approval" : "Approve"} 
    </button>
</div>
                    </div>

            </div>
            </div>
            </>
    )
}

export default InstructorDetailpage;