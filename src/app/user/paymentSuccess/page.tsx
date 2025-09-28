"use client"

import UserHeader from "@/components/user/userHeader";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

function PayementSuccess() {
  return (
    <>
      <UserHeader />
      <motion.div
        className="flex flex-col items-center justify-center mt-8 mx-auto max-w-md bg-gray-100 p-6 rounded-lg shadow-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Image */}
        <Image
          src="/images/success.png"
          alt="Payment Success"
          width={300}
          height={300}
          className="rounded-lg"
        />

        {/* Text Content */}
        <h1 className="text-xl font-semibold text-green-600 -mt-10">
          Payment Success
        </h1>
        <p className="text-gray-600 mt-2">Thank you for your payment!</p>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <Link href="/user/home">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg bg-green-600 text-white font-medium shadow hover:shadow-lg transition"
            >
              Go to Home
            </motion.button>
          </Link>

          <Link href="/user/sessions">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium shadow hover:shadow-lg transition"
            >
              Go to Session
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </>
  );
}

export default PayementSuccess;
