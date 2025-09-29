"use client"

import { createNewTest, getBundleData, getSlotList } from '@/app/lib/api/instructorApi';
import {Table , TableBody , TableCell , TableHead , TableHeader , TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { ToastContainer, toast } from "react-toastify";
import Link from 'next/link';
import { useDebugValue, useEffect, useState } from 'react';
export interface IUser {
  id: string;
  name: string;
  email: string;
  img: string | null;
  mobile: string | null;
}

export interface ISlot {
  id: string;
  instructorId: string;
  userId: string;
  roomId: string;
  title: string;
  startTime: string;   
  endTime: string;     
  createdAt: string;  
  isRated: boolean;
  user: IUser;      
  hasTest? : boolean   
}
export interface Question {
  id: string;
  bundleId: string;
  text: string;
  type: string;           
  options: string[];     
  answer: string;        
  createdAt: string;       
}

interface Bundle {
  id: string;
  bundleName: string;
  instructorId:string;
  questions: Question[];
  questionsCount:number;
}

function SlotList() {
    const [slots , setSlots] = useState<ISlot[]>([]);
    const [isOpen , setIsOpen] = useState(false);
    const [bundles, setBundles] = useState<Bundle[]>([]);
  const [selectedBundle, setSelectedBundle] = useState<string>("");
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [activeSlotId, setActiveSlotId] = useState<string>("");
    const [isData , setIsData] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 7;
    const date = new Date()

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
      };
   
    

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = slots.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(slots.length / itemsPerPage);

    const currentQuestions =
  bundles.find((b) => b.id === selectedBundle)?.questions ?? [];

    const getSlots = async() => {
        const res = await getSlotList();
        console.log(res.data.response.slot)
        if(res.data.response.success) {
          setSlots(res.data.response.slot)
        }
    }
    const getBundle = async() => {
      const data = await getBundleData();
      if(data.data.response.res){
        setBundles(data.data.response.res)
      }
    }
    const handleSave = async() => {
      const data = await createNewTest(activeSlotId ,selectedBundle,selectedQuestions )
      setActiveSlotId("");
      setSelectedBundle("");
      setSelectedQuestions([]);
      setIsOpen(false);
      if(data.data.response.data){

        toast.success(data.data.response.message)
        setSlots((prev) =>
          prev.map((slot) =>
            slot.id === activeSlotId ? { ...slot, hasTest: true } : slot
          )
        );
      }else{
        toast.error(data.data.response.message)
      }
    }

    useEffect(() => {
        getSlots();
    }, []);

    useEffect(() => {
      getBundle()
    },[isOpen])
    
    return (
        <>
         <ToastContainer/>

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
        </TableRow>
      </TableHeader>
      <TableBody>
      {currentData.length > 0 ? (
              currentData.map((slot:ISlot) => (
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
    <Link href={`/instructor/room/${slot.roomId}`}> <span className="inline-block px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
    join
  </span></Link>
  ) : (
    <span className="inline-block px-3 py-1 text-sm font-medium text-red-700 bg-red-100 rounded-full">
    Ended
  </span>
  )}
                </TableCell>
               

        {/* Add Test column */}
        <TableCell className="text-center">
  {new Date(slot.endTime) < new Date() ? (
    !slot.hasTest ? (
      <button
        onClick={() =>  {

          setIsOpen(true)
          setActiveSlotId(slot.id);
        }
          
        }
        className="inline-block px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full hover:shadow"
      >
        Add Test
      </button>
    ) : (
      <span className="inline-block px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full">
        Test Added
      </span>
    )
  ) : (
    <p></p>
  )}
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

    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create Test</DialogTitle>
          </DialogHeader>

          {/* Step 1: Select a bundle */}
          <div className="mb-4">
            <p className="font-medium mb-2">Step 1: Select a bundle</p>
            <Select onValueChange={setSelectedBundle} value={selectedBundle}>
  <SelectTrigger>
    <SelectValue placeholder="Choose bundle..." />
  </SelectTrigger>

  <SelectContent>
    {bundles.filter((b) => b.questions && b.questions.length >= 5).length > 0 ? (
      bundles
        .filter((b) => b.questions && b.questions.length >= 5)
        .map((b) => (
          <SelectItem key={b.id} value={b.id}>
            {b.bundleName} ({b.questions.length} questions)
          </SelectItem>
        ))
    ) : (
      <p className="px-2 py-1 text-sm text-gray-500">
      No valid bundles — each bundle must contain at least 5 questions.
    </p>
    )}
  </SelectContent>
</Select>
</div>
{selectedBundle && (
  <div className="max-h-48 overflow-y-auto border rounded p-2 space-y-2">
    {currentQuestions.map((q) => (
      <label key={q.id} className="flex items-center gap-2">
        <Checkbox
          checked={selectedQuestions.includes(q.id)}
          onCheckedChange={() =>
            setSelectedQuestions((prev) =>
              prev.includes(q.id)
                ? prev.filter((x) => x !== q.id)
                : [...prev, q.id]
            )
          }
        />
        <span className="text-sm">{q.text}</span>
      </label>
    ))}
  </div>
)}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              disabled={!selectedBundle}
              onClick={() => {
                if (!activeSlotId) return; 
            
                handleSave();
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
   </>
    )
}

export default SlotList;