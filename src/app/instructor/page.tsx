"use client"

import Navbar from "@/components/instructor/Navbar";
import Sidebar from "@/components/instructor/Sidebar";
import { useRouter } from "next/navigation";
import {  useEffect, useState } from "react";
import { getWallet } from "../lib/api/instructorApi";
import InstructorBar from "@/components/instructor/instructorBar";
import Graph from "@/components/instructor/graph";
import Cookies from "js-cookie";


 function instructorDashboard() {
    const router = useRouter();
    const [balance , setBalance] = useState();
    const [transactions , setTransactions] = useState<any>([])
    const [totalSlots , setTotalSlots] = useState<any>([])
    const authToken = Cookies.get('authToken');
   

    console.log("authdd", authToken);
    
    const fetchWallet = async() => {
        
        const res = await getWallet(authToken);
        console.log("ree" , res)
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
                  <p className="text-2xl font-bold">₹{balance}</p>
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
            
            

            {/* Bar Section */}
            <div className="mt-9">
  <div className="flex ">
  <h3 className="text-lg font-bold mb-4">Session</h3>
    <div className="flex-1">
      <InstructorBar />
    </div>
    {/* <h3 className="text-lg font-bold mb-4">transaction</h3> */}
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