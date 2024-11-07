"use client"

import { useEffect, useState } from "react";
import Layout from "@/app/components/header/layout";

import { useRouter } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import { verifyInsructor } from "@/app/lib/api/instructorApi";
import Otp from "@/app/components/otp/Otp";


 function instructorOtp() {
   

    return (
        <>
         <>
        <Otp role="instructor"/>
        </>
        </>
    )
}

export default instructorOtp;