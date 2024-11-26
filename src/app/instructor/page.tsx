"use client"

import Navbar from "@/components/instructor/Navbar";
import Sidebar from "@/components/instructor/Sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

 function instructorDashboard() {
    const router = useRouter();

    useEffect(() => {
        router.refresh();
    },[]);
    return (
        <>
         <div className="h-screen ">
            <div className="w-full">
                <Navbar />
            </div>
            <div className="flex">
                <div className="w-[250px]">
                    <Sidebar />
                </div>

                <div className="flex-1 p-10">
                    this is dashboard
                    </div>
                    </div>
                    </div>
        </>
    )
}

export default instructorDashboard;