"use client"

import { getCategoryData } from "@/app/lib/api/userApi";
import { useEffect } from "react";
import UserHeader from "@/app/components/user/userHeader";
import { useRouter } from "next/navigation";




export default function Home() {
  const router  = useRouter()

  const getCatData = async() => {
    const res = await getCategoryData();
  }

  useEffect(() => {
    router.refresh();
    getCatData();
  },[]);
 
    return (
      <>
      <UserHeader/>
        <h1>Welcome to your home page</h1>
        <p>You are logged in.</p>
        
      </>
    );
  }
  
