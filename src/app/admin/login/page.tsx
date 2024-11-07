"use client"

import { verifyLogin } from "@/app/lib/api/adminApi";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from "@/app/components/header/Header";

interface adminData {
    email: string,
    password: string
}

export default function AdminLogin() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<adminData>();
    const router = useRouter();

    const onSubmit = async (data: adminData) => {
        const { email, password } = data;
        const res = await verifyLogin(email, password);
        if (res.data.response.success === true) {
            router.push('/admin');
        } else {
            toast.error(res.data.response.message);
        }
    };

    return (
        <>
            <ToastContainer />
          
<div className="ml-20">

            <div className="flex justify-center items-center mt-20 ml-20">
                <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                    <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">Admin Login</h2>
                    
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                {...register('email', { required: true, pattern: /^[^@\s]+@gmail\.com$/ })}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                                required
                            />
                            {errors.email && <span className="text-red-600">Enter a valid email address</span>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                {...register('password', {
                                    required: true,
                                    minLength: { value: 6, message: 'Password must be at least 6 characters long' },
                                    validate: (value) => value.trim().length > 0 || 'Password cannot be only spaces'
                                })}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                                required
                            />
                            {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full bg-sky-500 text-white py-2 px-4 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </>
    );
}
