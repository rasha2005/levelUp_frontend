"use client"

import { deleteCatData, getCatData } from '@/app/lib/api/adminApi';
import {Table , TableBody , TableCell , TableHead , TableHeader , TableRow } from '@/components/ui/table'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/admin/Sidebar";

interface CategoryData {
    id:string | undefined;
    catName:string;
}

function Category() {

    const [categoryData , setCategoryData] = useState<CategoryData[]>([]);
    const [isData , setIsData] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [deleteCategoryId, setDeleteCategoryId] = useState<string | undefined>(undefined);

    const getCategoryData = async() => {
        const res = await getCatData();
        if(res.data.response.success === true) {
            setCategoryData(res.data.response.category || []);
            setIsData(true);
        }
        
    }
    const handleDeleteClick = (id:string | undefined) => {
        
        setDeleteCategoryId(id);
        setIsOpen(true); 
    };

    const handleDelete = async() => {
        if (deleteCategoryId) {
            const res = await deleteCatData(deleteCategoryId);
            if(res.data.response.success === true){
                toast.success(res.data.response.message);
            }
            setIsOpen(false);
            setDeleteCategoryId(undefined); 
            getCategoryData();
        }
    };
   

    useEffect(() => {
        getCategoryData();
    },[]);
    return (
        <>
        <ToastContainer />
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
            <div className="flex justify-between items-center mx-auto max-w-[900px] mt-10 px-7">
    <h3 className="text-2xl font-semibold">Categories</h3>
    <Link href={'/admin/addCategory'}><button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Category</button></Link>
</div>
        <div className="mt-7 max-w-[700px] mx-auto">
            <div className="mb-4 ml-7">
                {/* Additional elements like search input or filters can go here */}
            </div>
            
            {/* Use `table-auto` to size the table according to its content */}
            <Table className="w-full border border-gray-200">
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center px-6 py-3">Category Name</TableHead>
                        <TableHead className="text-center px-6 py-3">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {isData && categoryData.length > 0 ? (
                categoryData.map((cat) => (
                    <TableRow key={cat.id}>
                        <TableCell className="text-center px-6 py-2">{cat.catName}</TableCell>
                        <TableCell className="text-center px-6 py-2">
                            <div className="flex justify-center space-x-4">
                                <Link href={{ pathname: `/admin/editCategory/${cat.id}`, query: { name: cat.catName } }}>
                                    <button className="text-blue-500 hover:underline">Edit</button>
                                </Link>
                                <AlertDialog open={isOpen && deleteCategoryId === cat.id} onOpenChange={setIsOpen}>
                                    <AlertDialogTrigger asChild>
                                        <button
                                            className="text-red-500 hover:underline"
                                            onClick={() => handleDeleteClick(cat.id)}
                                        >
                                            Delete
                                        </button>
                                    </AlertDialogTrigger>

                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Delete Category</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Are you sure you want to delete this category? This action cannot be undone.
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
                                                onClick={handleDelete}
                                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 ml-2"
                                            >
                                                Delete
                                            </button>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </TableCell>
                    </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell colSpan={2} className="text-center">
                        No categories found
                    </TableCell>
                </TableRow>
            )}
                </TableBody>
            </Table>
        </div>
    </div>
    </div>
    </div>
    </div>
    </>
    )
}

export default Category