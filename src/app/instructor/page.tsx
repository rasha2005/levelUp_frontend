"use client"

import Navbar from "@/components/instructor/Navbar";
import Sidebar from "@/components/instructor/Sidebar";
import { useRouter } from "next/navigation";
import {  useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getWallet } from "../lib/api/instructorApi";
import Cookies from "js-cookie";
import { FaDollarSign, FaExchangeAlt, FaRegCalendarCheck } from "react-icons/fa";

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
     <div className="h-screen bg-gray-50"> {/* Added a light background for the whole screen */}
        <div className="w-full">
          <Navbar /> {/* Your Navbar component */}
        </div>
        <div className="flex">
          <div className="w-[250px] flex-shrink-0">
            <Sidebar /> {/* Your Sidebar component */}
          </div>

          <div className="flex-1 p-8 overflow-y-auto">
            <h1 className="text-2xl font-semibold mb-8 text-gray-800">Overview</h1> 
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex justify-between items-center min-h-[140px]">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Revenue </p>
                        <p className="text-3xl font-bold text-gray-900">₹{balance ? Number(balance).toFixed(2) : 0}</p>
                        <div className="flex items-center text-green-600 text-sm mt-2">
                            
                        </div>
                    </div>
                    <div className="p-3 bg-indigo-100 rounded-full text-indigo-600 text-3xl">
                        <FaDollarSign />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex justify-between items-center min-h-[140px]">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Transactions </p>
                        <p className="text-3xl font-bold text-gray-900">{transactions.length}</p>
                        <div className="flex items-center text-red-600 text-sm mt-2">
                            
                        </div>
                    </div>
                    <div className="p-3 bg-red-100 rounded-full text-red-600 text-3xl">
                        <FaExchangeAlt />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex justify-between items-center min-h-[140px]">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Slots </p>
                        <p className="text-3xl font-bold text-gray-900">{totalSlots.length}</p>
                        <div className="flex items-center text-gray-500 text-sm mt-2">
                            
                        </div>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full text-green-600 text-3xl">
                        <FaRegCalendarCheck />
                    </div>
                </div>
                
            </div>
            
           
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    

    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 lg:col-span-2">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Transaction </h3>
        <div className="h-[350px]"> 
            <Graph transactions={transactions} />
        </div>
    </div>

  
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 lg:col-span-1">
        
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Total Sessions</h3>
        <div className="h-[350px]">
            <InstructorChart/>
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