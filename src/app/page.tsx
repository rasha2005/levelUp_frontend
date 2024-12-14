'use client'

import Image from "next/image";
import Layout from "../components/header/layout";
import Link from "next/link";
import { motion } from 'framer-motion';


export default function Home() {
  return (
   
    <main className="">
      <div className="container mx-auto px-6 mt-5">
  <div className="flex justify-between items-center">
    {/* Left Side: "Level Up" Text */}
    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
      Level Up
    </div>

    {/* Right Side: Navigation Links */}
    <div className="space-x-8">
      <Link href="/signup" className="text-gray-800 hover:text-blue-600 font-medium">
        SignUp
      </Link>
      <Link href="/login" className="text-gray-800 hover:text-blue-600 font-medium">
        <span className="text-blue-600">Login</span>
      </Link>
    </div>
  </div>
</div>
        {/* Hero Section */}
        <section className="bg-white py-20">

          
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
      {/* Left Side - Text Content */}
      <motion.div 
        className="text-center md:text-left md:w-1/2"
        initial={{ opacity: 0, x: -100 }} 
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }} 
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Transform Your Future with <span className="text-blue-600">LevelUp</span>
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Achieve your personal and professional goals with tailored coaching plans designed to help you succeed in health, career, and life. Start your journey today!
        </p>
        <Link href={'/signup'}>
          <button className="bg-purple-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-600 transition duration-300">
            Get Started Now!
          </button>
        </Link>
      </motion.div>

      {/* Right Side - Image */}
      <motion.div
        className="md:w-1/2 mt-10 md:mt-0 flex justify-center"
        initial={{ opacity: 0, x: 100 }} 
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }} 
      >
        <Image
          src="/images/landing1.png" 
          alt="Description of image 1"
          width={500} 
          height={300} 
          className="rounded-lg"
        />
      </motion.div>
    </div>

  {/* Slider Indicators */}
  {/* <div className="mt-8 flex justify-center space-x-3">
    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
  </div> */}
</section>



      {/* Features Section */}
      {/* <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-10">What We Offer</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h4 className="text-xl font-bold mb-4">Personalized Coaching</h4>
              <p>
                Get a dedicated coach who works with you to create a plan tailored to your specific needs and goals.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h4 className="text-xl font-bold mb-4">Progress Tracking</h4>
              <p>
                Track your progress over time with detailed reports, ensuring you're always on track to achieve your objectives.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h4 className="text-xl font-bold mb-4">Expert Coaches</h4>
              <p>
                Our team of professional coaches specialize in health, fitness, career, and personal development.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="bg-blue-600 py-16 text-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Start Your Journey Today</h3>
          <p className="text-lg mb-8">
            Sign up for personalized coaching and take the first step towards achieving your goals.
          </p>
          <Link
            href="/signup"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-200"
          >
            Join Now
          </Link>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 levelUp. All rights reserved.</p>
        </div>
      </footer>
    </main>
  
  );
}
