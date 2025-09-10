"use client"

import Navbar from "@/components/instructor/Navbar";
import Sidebar from "@/components/instructor/Sidebar";
import { useRouter } from "next/navigation";
import {  useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getWallet } from "../lib/api/instructorApi";
import Cookies from "js-cookie";

const Graph = dynamic(() => import("@/components/instructor/graph"), {
  ssr: false,
})

const InstructorChart = dynamic(() => import("@/components/instructor/instructorBar"), {
  ssr: false,
})


 function instructorDashboard() {
    const router = useRouter();
    const [balance , setBalance] = useState();
    const [transactions , setTransactions] = useState([])
    const [totalSlots , setTotalSlots] = useState([])
    const authToken = Cookies.get('authToken');
   

    
    const fetchWallet = async() => {
        
        const res = await getWallet(authToken);
        setTransactions(res.data.response.Wallet.transactions)
        setBalance(res.data.response.Wallet.balance)
         setTotalSlots(res.data.response.slot)
    }

    useEffect(() => {
        fetchWallet();
    },[]);

    useEffect(() => {
        router.refresh();
    },[]);
    return (
      <>
      <div className="h-screen">
        <div className="w-full">
          <Navbar />
        </div>
        <div className="flex">
          <div className="w-[250px]">
            <Sidebar />
          </div>

          <div className="flex-1 p-10">
            <h1 className="text-xl font-bold mb-6">Dashboard</h1> {/* Main content */}
            <div className="grid grid-cols-4 gap-6">
              {/* Wallet Card */}
              <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-md">
                <div>
                  <p className="text-sm text-gray-500">Revenue </p>
                  <p className="text-2xl font-bold">₹{balance ? Number(balance).toFixed(2) : 0}</p>
                </div>
                <div className="text-orange-500 text-4xl">
                  <i className="fas fa-users"></i>
                </div>
                
              </div>

               <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-md">
                <div>
                  <p className="text-sm text-gray-500">Transactions </p>
                  <p className="text-2xl font-bold">{transactions.length}</p>
                </div>
                <div className="text-orange-500 text-4xl">
                  <i className="fas fa-users"></i>
                </div>
                
              </div>

              <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-md">
                <div>
                  <p className="text-sm text-gray-500">Slots </p>
                  <p className="text-2xl font-bold">{totalSlots.length}</p>
                </div>
                <div className="text-orange-500 text-4xl">
                  <i className="fas fa-users"></i>
                </div>
                
              </div>
              
            </div>
            
            

         
            <div className="mt-9">
  <div className="flex ">
  <h3 className="text-lg font-bold mb-4">Session</h3>
    <div className="flex-1">
     <InstructorChart/>
    </div>
    <div className="flex-1">
      <Graph transactions={transactions} />
    </div>
  </div>
</div>
          </div>
        </div>
      </div>
    </>
    )
}

export default instructorDashboard;