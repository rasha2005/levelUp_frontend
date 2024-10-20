"use client"

import Layout from "../components/header/layout";
import { motion } from "framer-motion";
import Image from 'next/image';
import Link from 'next/link';

export default function Signup() {
    return (
        <Layout>
                   <motion.p
                className="text-center text-lg sm:text-xl md:text-2xl font-bold mb-4 p-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                How would you like to engage with this app?
            </motion.p>
            <div className="flex justify-center p-8">
                <div className="flex flex-col sm:flex-row justify-center sm:gap-4 max-w-4xl w-full mx-auto">
                    <motion.div
                        className="w-full sm:w-1/2 p-6 bg-blue-200 rounded-lg shadow-md mb-4 sm:mb-0 hover:rotate-2 hover:shadow-2xl transition-all duration-300"
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
                            Be an instructor and <br /> help others grow
                        </p>
                    </motion.div>
                    <div className="w-full sm:w-1/2">
    <Link href="/user/signup">
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
                Be a student and level <br /> up your career
            </p>
        </motion.div>
    </Link>
</div>
                </div>
            </div>
        </Layout>
    )
}