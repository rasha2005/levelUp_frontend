"use client";

import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/admin/Sidebar";
import { fetchDetails, getInstructor, getUsers } from "../lib/api/adminApi";
import PieChartComp from "@/components/admin/pie";
import BarComponent from "@/components/admin/bar";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import InstructorData from "../utils/interface/InstrcutorData";
import { Star } from "lucide-react";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

interface revenueSummary {
  totalCourses:number
  totalEnrollments:number
  totalRevenue:number
}

const AdminHome = () => {
  const [wallet, setWallet] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalInstructor, setTotalInstructor] = useState(0);
  const [summary ,setSummary] = useState<revenueSummary | null>();
  const [topInstructors , setTopInstructor] = useState<InstructorData[] | null>([]);

  // Dummy revenue data for now
  const revenueData = [
    { id: 1, courseName: "Full Stack Bootcamp", instructor: "John Doe", enrollments: 45, revenue: 45000, date: "2025-10-03" },
    { id: 2, courseName: "UI/UX Design Basics", instructor: "Sarah Lee", enrollments: 30, revenue: 27000, date: "2025-10-02" },
    { id: 3, courseName: "Data Structures Mastery", instructor: "Alex Roy", enrollments: 25, revenue: 25000, date: "2025-10-01" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchDetails();
      setWallet(res.data.response.wallet.walletBalance);

      const user = await getUsers();
      setTotalUsers(user.data.response.userData.length);

      const instructor = await getInstructor();
      setTotalInstructor(instructor.data.response.totalInstructor);
      setSummary(instructor.data.response.revenueSummary);
      setTopInstructor(instructor.data.response.instructorData);
    };

    fetchData();
  }, []);
  const dummyEarningsData = [
    { date: 'September 15', itemCount: 40, text: '$20', earning: '$95,013' },
    { date: 'September 16', itemCount: 50, text: '$40', earning: '$95,013' },
    { date: 'September 17', itemCount: 35, text: '$12', earning: '$95,013' },
    { date: 'September 18', itemCount: 25, text: '$16', earning: '$95,013' },
    { date: 'September 19', itemCount: 21, text: '$12', earning: '$95,013' },
  ];
  const monthlyRevenue = [
    { month: 'Jan', amount: 500 }, { month: 'Feb', amount: 800 }, { month: 'Mar', amount: 650 },
    { month: 'Apr', amount: 550 }, { month: 'May', amount: 680 }, { month: 'Jun', amount: 520 },
    { month: 'Jul', amount: 620 }, { month: 'Aug', amount: 720 }, { month: 'Sep', amount: 850 },
    { month: 'Oct', amount: 880 }, { month: 'Nov', amount: 670 }, { month: 'Dec', amount: 700 }
  ];
 

// Dummy data for 'Most Popular Products' to match the image
const dummyProducts = [
    { id: 'P-1001', name: 'Wireless Earbuds Pro', price: '$210', status: 'In Stock', img: 'earbuds.png', sub: '1438' },
    { id: 'P-1002', name: 'Smart Fitness Watch', price: '$125', status: 'Out of Stock', img: 'watch.png', sub: '2045' },
    { id: 'P-1003', name: 'Portable Blender', price: '$256', status: 'In Stock', img: 'blender.png', sub: '1899' },
    { id: 'P-1004', name: 'Gaming Mouse RGB', price: '$85', status: 'In Stock', img: 'mouse.png', sub: '900' },
];
  return (
    <>
      <div className="h-screen bg-gray-50"> {/* Added a light background */}
    <div className="w-full">
      <Navbar />
    </div>
    <div className="flex">
      {/* Sidebar - Keep it dark like the image's overall color palette */}
      <div className="w-[250px] bg-white h-screen ">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto"> 
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Dashboard</h1>

        {/* Top Overview Cards (Sessions, Avg. Sessions, Bounce Rate, Goal Completions) */}
        {/* Using your existing data fields and structuring them into four cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
            {/* Card 1: Revenue (Your 'wallet' data) styled as the 'Sessions' card */}
            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-violet-500">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Revenue</p>
                        <p className="text-3xl font-bold text-gray-800">₹{wallet.toLocaleString()}.00</p>
                    </div>
                    <i className="fas fa-coins text-2xl text-violet-500 opacity-75"></i>
                </div>
                {/* Placeholder for the small change indicator below */}
                <p className="mt-2 text-xs text-green-500 font-medium">
                  <i className="fas fa-arrow-up"></i> 5% New Revenue Today
                </p>
            </div>

            {/* Card 2: Total Users (Your 'totalUsers' data) styled as the 'Avg. Sessions' card */}
            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Users</p>
                        <p className="text-3xl font-bold text-gray-800">{totalUsers.toLocaleString()}</p>
                    </div>
                    <i className="fas fa-users text-2xl text-blue-500 opacity-75"></i>
                </div>
                <p className="mt-2 text-xs text-red-500 font-medium">
                  <i className="fas fa-arrow-down"></i> 8% Weekly Avg. Users
                </p>
            </div>

            {/* Card 3: Total Instructors (Your 'totalInstructor' data) styled as the 'Bounce Rate' card */}
            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Instructors</p>
                        <p className="text-3xl font-bold text-gray-800">{totalInstructor}</p>
                    </div>
                    <i className="fas fa-chalkboard-teacher text-2xl text-red-500 opacity-75"></i>
                </div>
                <p className="mt-2 text-xs text-red-500 font-medium">
                  <i className="fas fa-arrow-down"></i> 10% Weekly Change
                </p>
            </div>

            {/* Card 4: New Metric (Placeholder for 'Goal Completions') */}
            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-green-500">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Courses Sold</p>
                        <p className="text-3xl font-bold text-gray-800">91,000</p>
                    </div>
                    <i className="fas fa-graduation-cap text-2xl text-green-500 opacity-75"></i>
                </div>
                <p className="mt-2 text-xs text-green-500 font-medium">
                  <i className="fas fa-arrow-up"></i> 6% Completions Weekly
                </p>
            </div>
        </div>
        
        {/* Revenue Status (NEW Revenue Analysis Graph) and Audience Overview */}
<div className="flex gap-6 mb-8">
  {/* Left Block: Revenue Status / Revenue Analysis Graph (The big chart) */}
  {/* The 'flex-2' class ensures this component is larger than the right one. */}
  <div className="w-9/12 bg-white p-6 rounded-xl shadow-lg"> 
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-800 flex items-center">
        <span className="w-2 h-2 rounded-full bg-violet-600 mr-2"></span>
        Revenue Status
      </h2>
     
    </div>
    
    {/* NEW: Revenue Analysis Graph component integrated here */}
    <div className="h-[300px] w-full"> 
      {/* Assuming RevenueBarChart is imported and used here */}
      <BarComponent />
    </div>
    <div className="flex justify-end mt-6">
      <Link href={'/admin/revenue-report'}>
    <button
      className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition"
    >
      View Full Report
    </button>
      </Link>
  </div>
  </div>

  {/* Right Block: Audience Overview (using your existing Pie Chart) */}
  <div className="w-7/12 bg-white p-6 rounded-xl shadow-lg">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-800 flex items-center">
        <span className="w-2 h-2 rounded-full bg-blue-600 mr-2"></span>
        Audience Overview
      </h2>
      <button className="text-sm text-gray-500">All <i className="fas fa-chevron-down ml-1 text-xs"></i></button>
    </div>
    <div className="text-center">
        {/* Your Pie Chart Component */}
        <div className="h-[200px] w-full"> 
          <PieChartComp totalInstructors={totalInstructor} totalStudents={totalUsers}/>
        </div>
        <p className="text-4xl font-bold mt-4 text-gray-800">
        {totalUsers + totalInstructor}
      </p>
      <p className="text-sm text-gray-500">Total People</p>

        {/* Legend (Matching the image) */}
        <div className="flex justify-center gap-6 mt-6 text-sm">
            <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
            <span className="font-medium">Students</span>
            </div>
            <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                <span className="font-medium">Instructors</span>
            </div>
            
        </div>
    </div>
  </div>
</div>

        <div className="flex gap-6">
    {/* Left Block: Earnings Reports (Styled EXACTLY like the image) */}
    <div className="flex-2 w-7/12 bg-white p-6 rounded-xl shadow-lg">
    <div className="flex justify-between items-center mb-6">
    <h2 className="text-lg font-semibold text-gray-800 flex items-center">
      <span className="w-2 h-2 rounded-full bg-indigo-600 mr-2"></span>
      Earnings Summary
    </h2>
  </div>

  {/* Table */}
  <table className="w-full text-sm">
    <thead>
      <tr className="text-gray-500 border-b border-gray-200">
        <th className="py-3 text-left font-medium">Metric</th>
        <th className="py-3 text-right font-medium">Value</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-gray-100">
        <td className="py-3 font-medium text-gray-700">Total Courses</td>
        <td className="py-3 text-right text-gray-800">{summary?.totalCourses}</td>
      </tr>

      <tr className="border-b border-gray-100">
        <td className="py-3 font-medium text-gray-700">Total Enrollments</td>
        <td className="py-3 text-right text-gray-800">{summary?.totalEnrollments}</td>
      </tr>

      <tr>
        <td className="py-3 font-medium text-gray-700">Total Revenue</td>
        <td className="py-3 text-right font-semibold text-green-600">
          ₹{summary?.totalRevenue.toLocaleString()}
        </td>
      </tr>
    </tbody>
  </table>

  
    </div>

    {/* Right Block: Most Popular Products (Styled EXACTLY like the image) */}
    <div className="flex-1 w-5/12 bg-white p-6 rounded-xl shadow-lg">
  <h2 className="text-lg font-semibold mb-6 text-gray-800 flex items-center">
    <span className="w-2 h-2 rounded-full bg-purple-600 mr-2"></span>
    Top Instructors
  </h2>

  <div className="space-y-3">
    {topInstructors?.map((instructor) => (
      <div
        key={instructor.id}
        className="flex items-center text-sm text-gray-700 space-x-3"
      >
        {/* Image */}
        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
         
            <img
              src={instructor.img || "/images/defaultProfile.jpg"}
              alt={instructor.name}
              className="w-full h-full object-cover rounded-lg"
            />
          
        </div>

        {/* Name & Stars */}
        <div className="flex flex-col">
          <p className="font-medium text-gray-800">{instructor.name}</p>
          <div className="flex items-center mt-1">
          {[...Array(5)].map((_, index) => {
            const currentRate = index + 1;
            return (
              <Star
                key={currentRate}
                size={14}
                className={currentRate <= Math.ceil(instructor.rating / 10) ? "text-yellow-400" : "text-gray-300"}
              />
            );
          })}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
</div>
      </div>
    </div>
  </div>
    </>
  );
};

export default AdminHome;
