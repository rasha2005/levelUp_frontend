"use client"
import { editInstructorDetails, getInstructorDetails } from "@/app/lib/api/instructorApi";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import 'react-toastify/dist/ReactToastify.css';

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
  interface FormProps {
    showToast: (message: string, type?: "success" | "error") => void;
}
interface FormData {
    name:string;
    mobile:string;

}
function Form({showToast}:FormProps) {
    const { register, handleSubmit, setValue ,formState:{errors , isValid},watch} = useForm<FormData>();
    // const [instructorId , setInstructorI] = useState<InstructorData>();

    const getData = async() => {
        const res = await getInstructorDetails();
        if (res?.data?.response?.res) {
            // setUserId(res.data.response.user.id);
            setValue("name", res.data.response.res.name);
            setValue("mobile", res.data.response.res.mobile);
            
        }
    }

    const onEdit = async(data:FormData) => {
        const {name , mobile} = data;
        const res = await editInstructorDetails(name , mobile);
        if(res.data.response.success === true){
            setValue("name", res.data.response.res.name);
            setValue("mobile", res.data.response.res.mobile);
            showToast("Details updated successfully!", "success"); // Success toast
        } else {
            showToast("Failed to update details.", "error"); // Error toast
        }

    }

    useEffect(() => {
        getData();
    },[])
    return (
        <>
           <form onSubmit={handleSubmit(onEdit)}  className="mt-4" >
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
                                        required
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
                                        required
                                    />
                                      {errors.mobile && <span className="text-red-600">Enter a valid 10-digit mobile number</span>}
                                </div>
                                <button 
                                        type="submit"
                                        className="mt-4 bg-sky-900 text-white px-4 py-2 rounded-full shadow hover:bg-sky-950"
                                    >
                                        Save Changes
                                    </button>
                                    <div className="mb-4">
                                                                            <Link
                                                                            href="/instructor/validation"
                                                                            className="text-blue-600 hover:underline"
                                                                            >
                                                                            Validation Form
                                                                            </Link>
                                                                        </div>
                                    </form>

                                    
        </>
    )
}

export default Form;