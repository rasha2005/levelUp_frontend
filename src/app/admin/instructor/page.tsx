"use client"

import { getInstructor } from '@/app/lib/api/adminApi';
import {Table , TableBody , TableCell , TableHead , TableHeader , TableRow } from '@/components/ui/table'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/admin/Sidebar";


interface InstructorData {
    id?:string;
    img?:string;
    name:string;
    email:string;
    mobile:string;
}

function InstructorMangement()  {
    const [instructorData , setInstructorData] = useState<InstructorData[]>([]);
    const [isData , setIsData] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 7;

    const getInstructorData = async() => {
        try{
            const res = await getInstructor();
            if(res.data.response.success === true){
                setInstructorData(res.data.response.instructorData || null);
                setIsData(true);
            }

        }catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getInstructorData();
    },[])

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
      };
      const filteredData = instructorData.filter(
        (instructor) =>
            instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            instructor.email.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    
    return ( 
      <div className="h-screen ">
            <div className="w-full">
                <Navbar />
            </div>
            <div className="flex">
                <div className="w-[250px]">
                    <Sidebar />
                </div>

                <div className="flex-1 p-10">  
        <div className='mt-10'>
        <h3 className='text-2xl ml-7 mb-4 font-semibold'>Instructor Management</h3>
        
        <div className="mt-1 max-w-[900px] mx-auto">
        <div className="mb-4  ">
       
           
            
        <input
          type="text"
          placeholder="Search by name or email.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded w-full max-w-[900px]"
        />
        
      </div>
    <Table className="w-full border border-gray-200"> 
      <TableHeader>
        <TableRow>
        <TableHead className="text-center">Profile</TableHead>

          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">Email</TableHead>
          <TableHead className="text-center">Mobile</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      {isData && currentData.length > 0 ? (
              currentData.map((instructor) => (
                <TableRow key={instructor.id}>
                   <TableCell className="flex justify-center items-center">
                              <img
                                src={instructor.img||"/images/defaultProfile.jpg"}
                                alt={`${instructor.name}'s profile`}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            </TableCell>
                    <TableCell className="text-center">{instructor.name}</TableCell>
                    <TableCell className="text-center">{instructor.email}</TableCell>
                    <TableCell className="text-center">{instructor.mobile}</TableCell>
                    <TableCell className="text-center text-blue-700">
                    <Link href={`/admin/instructorDetailpage/${instructor.id}`}>View</Link>
                    </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No user found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        
    </Table>
    <div className="flex justify-center mt-7 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
    </div>
    </div>
    </div>
    </div>
    </div>
     );
}
 
export default InstructorMangement;