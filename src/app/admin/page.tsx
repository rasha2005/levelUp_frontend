"use client"

import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/admin/Sidebar";
import { fetchDetails, getInstructor, getUsers } from "../lib/api/adminApi";
import PieChartComp from "@/components/admin/pie";
import BarComponent from "@/components/admin/bar";
import { useEffect, useState } from "react";

const AdminHome = () => {
  const [wallet, setWallet] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalInstructor, setTotalInstructor] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchDetails();
      setWallet(res.data.response.wallet.walletBalance);

      const user = await getUsers();
      setTotalUsers(user.data.response.userData.length);

      const instructor = await getInstructor();
      setTotalInstructor(instructor.data.response.instructorData.length);
    };

    fetchData();
  }, []);


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
      <h1 className="text-xl font-bold mb-6"> Dashboard</h1> {/* Main content */}
      <div className="grid grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-md">
          <div>
            <p className="text-sm text-gray-500">Revenue </p>
            <p className="text-2xl font-bold">₹{wallet}.00</p>
          </div>
          <div className="text-orange-500 text-4xl">
            <i className="fas fa-users"></i>
          </div>
        </div>

        <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-md">
          <div>
            <p className="text-sm text-gray-500">Total Users </p>
            <p className="text-2xl font-bold">{totalUsers}</p>
          </div>
          <div className="text-orange-500 text-4xl">
            <i className="fas fa-users"></i>
          </div>
        </div>

        <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-md">
          <div>
            <p className="text-sm text-gray-500">Total Instructors </p>
            <p className="text-2xl font-bold">{totalInstructor}</p>
          </div>
          <div className="text-orange-500 text-4xl">
            <i className="fas fa-users"></i>
          </div>
        </div>
        </div>
        <div className="mt-9 flex justify-between items-center gap-4">
    <div className="flex-1">
      <h3>Instructors</h3>
        <PieChartComp />
    </div>
    <div className="flex-1">
      <h3>Users</h3>
        <BarComponent />
    </div>
</div>
        </div>
            </div>
        </div>
    </> 
    );
}
 
export default AdminHome;