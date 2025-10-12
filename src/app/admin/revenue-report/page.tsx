"use client";

import { useEffect, useState } from "react";
import { getTransaction } from "@/app/lib/api/adminApi";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import { InstructorRevenueSummary } from "@/app/utils/interface/Transaction";



export default function RevenueReport() {
  const [instructors, setInstructors] = useState<InstructorRevenueSummary[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [startDate, setStartDate] = useState(""); // new
  const [endDate, setEndDate] = useState("");
  const limit = 15;
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); 
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);


  const fetchData = async () => {
    const res = await getTransaction(debouncedSearch, page, limit , startDate, endDate);
    setInstructors(res.data.response.data);
    setTotalPages(Math.ceil(res.data.response.total / limit));
  };

  useEffect(() => {
    fetchData();
  }, [debouncedSearch, page ,  startDate, endDate]);

  return (
    <div className="h-screen flex flex-col">
    <div className="w-full">
      <Navbar />
    </div>
  
    <div className="flex flex-1">
      {/* Sidebar on the left */}
      <div className="w-[250px]">
        <Sidebar />
      </div>
  
      {/* Main content area */}
      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <h1 className="text-xl font-bold mb-4">Revenue Report</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="Search Instructor"
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              className="p-2 border rounded flex-1"
            />

            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setPage(1);
              }}
              className="p-2 border rounded"
            />

            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setPage(1);
              }}
              className="p-2 border rounded"
            />
          </div>


<table className="w-full border border-gray-200 rounded-lg shadow-sm">
  <thead className="bg-gray-100">
    <tr className="border-b text-left text-gray-700">
      <th className="p-3 font-semibold">Instructor</th>
      <th className="p-3 font-semibold text-center">Instructor Email</th>
      <th className="p-3 font-semibold text-center">Total Earnings (₹)</th>
      <th className="p-3 font-semibold text-center">Admin Earnings (₹)</th>
    </tr>
  </thead>
  <tbody>
    {instructors.length > 0 ? (
      instructors.map((item) => (
        <tr key={item.instructorId} className="border-b hover:bg-gray-50 transition">
          <td className="p-3">{item.instructorName}</td>
          <td className="p-3 text-center text-gray-600">{item.instructorEmail}</td>
          <td className="p-3 text-center font-medium text-green-600">
            ₹{item.totalEarnings.toFixed(2)}
          </td>
          <td className="p-3 text-center font-medium text-violet-600">
            ₹{item.adminEarnings.toFixed(2)}
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={4} className="text-center p-4 text-gray-500">
          No records found.
        </td>
      </tr>
    )}
  </tbody>
</table>

        {/* Pagination */}
        <div className="flex justify-center mt-4 gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                page === i + 1 ? "bg-gray-200" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
