"use client"


import { blockUser, getUsers } from '@/app/lib/api/adminApi';
import {Table , TableBody , TableCell , TableHead , TableHeader , TableRow ,TableFooter} from '@/components/ui/table'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {Search} from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";

interface UserData {
    id?:string;
    name:string;
    email:string;
    mobile:string;
    isBlocked:boolean;
}

function UserManagement() {
    const [userData , setUserData] = useState<UserData[]>([]);
    const [isData , setIsData] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7; 
    const [isOpen, setIsOpen] = useState(false);
    const [blockUserId, setBlockUserId] = useState(null);
    const [searchTerm , setSearchTerm] = useState('');
    



    const getUserData = async() => {
        try{
            const res = await getUsers();
            console.log(res);
            if(res.data.response.success === true) {
                setUserData(res.data.response?.userData || []);
                setIsData(true);
            }

        }catch (err) {
            console.log(err);
        }
    }

    const handleBlockClick = (id:any) => {
          setBlockUserId(id);
          setIsOpen(true);
    }

    const handleBlock = async() => {
          if(blockUserId) {
            console.log("blockUserId",blockUserId);
            const res = await blockUser(blockUserId)
           if(res.data.response.success === true) {
            toast.success(res.data.response.message);
           }else{
            toast.error(res.data.response.message);
           }

           
          }
          setBlockUserId(null);
         setIsOpen(false);
         getUserData();
    }

    useEffect(() => {
        getUserData();
    },[]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
      };

      const filteredData = userData.filter(
       (user) => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) 
       
      )

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    return (
      <>
      <ToastContainer/>
       <div className='mt-10'>
        <h3 className='text-2xl ml-7 mb-4 font-semibold'>User Management</h3>
        
        <div className="mt-1 max-w-[900px] mx-auto">
        <div className="mb-4 ml-7 ">
       
           
            
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded w-full max-w-[900px]"
        />
        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          {/* <Search className="w-5 h-5 text-gray-400" /> */}
        </span>
      </div>
    <Table className="w-full border border-gray-200"> 
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">Email</TableHead>
          <TableHead className="text-center">Mobile</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
            {isData && currentData.length > 0 ? (
              currentData.map((user) => (
                <TableRow key={user.id}>
                    <TableCell className="text-center">{user.name}</TableCell>
                    <TableCell className="text-center">{user.email}</TableCell>
                    <TableCell className="text-center">{user.mobile}</TableCell>
                    <TableCell className="text-center">
                    <AlertDialog open={isOpen && blockUserId === user.id} onOpenChange={setIsOpen}>
                                    <AlertDialogTrigger asChild>
                                        <button
                                            className={`text-red-500 ${!user.isBlocked ? "bg-red-100 rounded-full px-4 py-2 hover:bg-red-200 hover:underline" : ""}`}
                                            onClick={!user.isBlocked ? () => handleBlockClick(user.id) : undefined}
                                            disabled={user.isBlocked} >
                                                {user.isBlocked ? "blocked" : "block"}
                                        </button>
                                    </AlertDialogTrigger>
                                  
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Block User</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Are you sure you want to Block this user?
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <button
                                                onClick={() => setIsOpen(false)}
                                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleBlock}
                                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 ml-2"
                                            >
                                                block
                                            </button>

                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                
                                </AlertDialog>
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
      </>
  
    )
}

export default UserManagement;