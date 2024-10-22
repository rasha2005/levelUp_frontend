"use client"

import Layout from "@/app/components/header/layout";
import { login } from "@/app/lib/api/instructorApi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface instructorData {
    email:string,
    password:string
}
export default function InstructorLogin() {
    const {register , handleSubmit , formState:{errors , isValid},watch} = useForm<instructorData>();
    const router = useRouter();

    const onSubmit = async(data:instructorData) => {
        const {email , password} = data;
        const res = await login(email , password);
        if(res.data.response.success === true) {
            router.push('/instructor/dashboard');
        }else{
            toast.error(res.data.response.message);
        }
    }

    return (
    <>
    <ToastContainer />
        <Layout>
  <header className=" py-4 mt-11"> 
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   
                    <div className="flex items-center justify-center">
                        <div className="text-center sm:text-left">
                        <Image
                                src="/images/login.jpg" 
                                alt="Description of image 1"
                                width={450} 
                                height={400} 
                                className="rounded-lg" 
                            />
                        </div>
                    </div>
    
                    {/* Right Side (Signup Form) */}
                    <div className="flex justify-center sm:justify-end mt-8">
                        <div className="bg-white p-6 rounded  w-full max-w-md mr-4 sm:mr-8">
                            <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
                               Log In
                            </h2>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        {...register('email', {required: true, pattern:/^[^@\s]+@gmail\.com$/})}
                                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                                        required
                                    />
                                    {errors.email && <span className="text-red-600">Enter a valid email address</span>}
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        {...register('password', { 
                                            required: true, 
                                            minLength: { 
                                              value: 6, 
                                              message: 'Password must be at least 6 characters long' 
                                            } ,
                                            validate: (value) => value.trim().length > 0 || 'Password cannot be only spaces'
                                          })}       
                                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                                        required
                                    />
                                   
                                   {errors.password && <span className="text-red-600">Password must be at least 6 characters long</span>}
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors"
                                >
                                   Log In
                                </button>
                                <p className="mt-4 text-sm text-gray-600">
                                   Do not have an account?{' '}
                                    <Link href="/user/signup">
                                        <span className="text-blue-500 hover:underline">
                                           Sign up
                                        </span>
                                    </Link>
                                    </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        </Layout>
        </>
    )
}