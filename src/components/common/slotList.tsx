"use client"

import { getSlotList } from '@/app/lib/api/instructorApi';
import {Table , TableBody , TableCell , TableHead , TableHeader , TableRow } from '@/components/ui/table'
import Link from 'next/link';
import { useDebugValue, useEffect, useState } from 'react';

function SlotList() {
    const [slots , setSlots] = useState<any>([]);
    const [isData , setIsData] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 7;
    const date = new Date()

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
      };
    //   const filteredData = slots.filter(
    //     (slot) =>
    //     slot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     slot.email.toLowerCase().includes(searchTerm.toLowerCase()) 
    // );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = slots.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(slots.length / itemsPerPage);

    const getSlots = async() => {
        const res = await getSlotList();
        console.log("res" , res)
        if(res.data.response.success) {
          setSlots(res.data.response.slot)
        }
    }

    useEffect(() => {
        getSlots();
    }, []);
    
    return (
        <>
        

                <div className="flex-1 p-10">  
        <div className='mt-10'>
        <h3 className='text-2xl ml-7 mb-4 font-semibold'>Slots</h3>
        
        <div className="mt-1 max-w-[900px] mx-auto">
        <div className="mb-4  ">
       
           
            
       
        
      </div>
    <Table className="w-full border border-gray-200"> 
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">Email</TableHead>
          <TableHead className="text-center">Tilte</TableHead>
          <TableHead className="text-center">Date</TableHead>
          <TableHead className="text-center">Time</TableHead>
          <TableHead className="text-center">Action</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      {currentData.length > 0 ? (
              currentData.map((slot:any) => (
                <TableRow key={slot?.id}>
                    <TableCell className="text-center">{slot.user.name}</TableCell>
                    <TableCell className="text-center">{slot.user.email}</TableCell>
                    <TableCell className="text-center">{slot.title}</TableCell>

                    <TableCell className="text-center">{new Date(slot.startTime).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}</TableCell>
                                <TableCell className="text-center">{new Date(slot.startTime).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })}</TableCell>

              <TableCell className="text-center">
              {new Date(slot.endTime) > new Date() ? (
    <Link href={`/instructor/room/${slot.roomId}`}>join</Link>
  ) : (
    <span>Ended</span>
  )}
                </TableCell>
            

                    <TableCell className="text-center text-blue-700">
                    <span>Rate this session</span>
                    </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No session booked yet
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
   </>
    )
}

export default SlotList;