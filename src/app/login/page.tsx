"use client"

import Image from "next/image"
import Layout from "../../components/header/layout"
import { motion } from "framer-motion";
import Link from "next/link";

export default function Login() {
    
    return (
        <>
         <Layout>
            <motion.p
                className="text-center text-lg sm:text-xl md:text-2xl font-bold mb-4 p-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Which one is you?
            </motion.p>
            <div className="flex justify-center p-8">
                <div className="flex flex-col sm:flex-row justify-center sm:gap-4 max-w-4xl w-full mx-auto">
                    <Link href="/instructor/login" className="block w-full sm:w-1/2"> {/* Add block and width classes here */}
                        <motion.div
                            className="w-full p-6 bg-blue-200 rounded-lg shadow-md mb-4 sm:mb-0 hover:rotate-2 hover:shadow-2xl transition-all duration-300"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="flex justify-center mb-4 hover:translate-y-2 transition-transform duration-300"> 
                                <Image
                                    src="/images/instructor.png" 
                                    alt="Description of image 1"
                                    width={300} 
                                    height={300} 
                                    className="rounded-lg" 
                                />
                            </div>
                            <p className="text-gray-700 text-black text-center mt-2 text-lg font-bold">
                             Instructor 
                            </p>
                        </motion.div>
                    </Link>

                    <div className="w-full sm:w-1/2">
                        <Link href="/user/login" className="block w-full">
                            <motion.div
                                className="p-6 bg-blue-200 rounded-lg shadow-md hover:rotate-2 hover:shadow-2xl transition-all duration-300"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <div className="flex justify-center mb-4 hover:translate-y-2 transition-transform duration-300"> 
                                    <Image
                                        src="/images/student.png"
                                        alt="Description of image 2"
                                        width={400}
                                        height={400}
                                        className="rounded-lg"
                                    />
                                </div>
                                <p className="text-gray-700 text-center text-black text-lg font-bold">
                                  Student 
                                </p>
                            </motion.div>
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
        </>
    )
}