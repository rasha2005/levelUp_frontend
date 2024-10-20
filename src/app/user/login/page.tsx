"use client "

import Layout from "@/app/components/header/layout"
import Image from 'next/image';
import Link from 'next/link'

export default function UserLogin() {
    return (
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
                            <form>
                                
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                                        required
                                    />
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                                        required
                                    />
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
        
    )
}