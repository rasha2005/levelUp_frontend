"use client";

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
  } from "@/components/ui/dialog"
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
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
import Sidebar from "@/components/instructor/Sidebar";
import { Plus, FileQuestion ,Trash2 , Edit } from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "@/components/instructor/Navbar";
import { createBundle, deleteBundle, getBundleData, updateBundle } from "@/app/lib/api/instructorApi";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";

interface QuestionBundle {
  id             :string;     
  instructorId   :string;
  bundleName     :string;
  questionsCount :number; 
  createdAt      :Date; 
}

export default function QuestionBank() {
    const [isOpen , setIsOpen] = useState<boolean>(false);
    const [bundleName , setBundleName] = useState("");
    const [bundleData , setBundleData] = useState<QuestionBundle[]>([]);
    const [bundleId , setBundleId] = useState("");
    const [isEdit , setIsEdit] = useState(false);
    const [isDelete , setIsDelete] = useState(false)
    const [error, setError] = useState("");

    const handleEdit = (id:string) => {
      const bundle = bundleData.find((b) => b.id === id); 
      if (bundle) {
        setBundleName(bundle.bundleName);
      }
      setIsEdit(true);
      setBundleId(id)
    }

    const handleDelete = (id:string) => {
      setIsDelete(true);
      setBundleId(id)

    }

   const  handleDeleteBundle = async() => {
      await deleteBundle(bundleId)
      setBundleData(prev => prev.filter(b => b.id !== bundleId));
      setIsDelete(false);
      setBundleId("");
   }

   const handleUpdateBundle = async() => {
    await updateBundle(bundleName , bundleId);
    setBundleData(prev =>
      prev.map(b =>
        b.id === bundleId ? { ...b, bundleName } : b
      )
    );
    setIsEdit(false);
    setBundleId("")
    setBundleName("")
   }
  const getBundle = async() => {
    try{
      const data = await getBundleData();
      if(data.data.response.res){
        setBundleData(data.data.response.res);
      }
    }catch(err){
      console.log(err)
    }
  }

  const handleCreateBundle = async() => {
    try{
      if (!bundleName.trim()) {
        setError("Bundle name is required");
        return;
      }

      setError("");

        const data = await createBundle(bundleName);
        setIsOpen(false);
        if(data.data.response.res){
          toast.success(data.data.response.message)
        }else{
          toast.error(data.data.response.message)
        }
        setBundleName("");
    }catch(err){
        console.log(err)
    }
  }

  useEffect(() => {
    getBundle();
  },[])

  return (
    <>
        <ToastContainer />
    
    <div className="min-h-screen bg-white">
    {/* Top navigation */}
    <Navbar />
  
    {/* Sidebar + main */}
    <div className="flex">
      <Sidebar />
  
      <main className="flex-1 p-6 bg-white">
        {/* Page header */}
        <div className="flex items-center gap-2 mb-6">
          <FileQuestion className="w-6 h-6 text-gray-700" />
          <h1 className="text-2xl font-bold">Question Bank</h1>
        </div>
  
        {/* Grid of cards */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Create Bundle card */}
          <div
            onClick={() => setIsOpen(true)}
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl h-40 cursor-pointer hover:shadow-md transition"
          >
            <Plus className="w-8 h-8 text-gray-500 mb-2" />
            <p className="text-gray-600 font-medium">Create Bundle</p>
          </div>
  
          {/* Existing bundles */}
          {bundleData.map((bundle,index) => (
           
            <div 
            
              key={index}
              className="border rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer"
            >
                <Link
             key={index}
             href={`/instructor/bundle/${bundle.id}`}  
             className="block"              
           >
              <h2 className="text-lg font-semibold mb-1">{bundle.bundleName}</h2>
              
              <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                {Number(bundle.questionsCount)}{" "}
                {bundle.questionsCount === 1 ? "Question" : "Questions"}
              </span>
           </Link>
              <div className="flex justify-end gap-3 mt-4">
              <button onClick={()=>handleEdit(bundle.id)}  className="text-blue-500 hover:text-blue-700">
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button  className="text-red-500 hover:text-red-700">
                                    <Trash2 onClick={() => handleDelete(bundle.id)} className="w-4 h-4" />
                                  </button>
                                </div>
            </div>
            
          ))}
        </div>
  
        {/* Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create a new bundle</DialogTitle>
              <DialogDescription>
                Enter a name for your question bundle.
              </DialogDescription>
            </DialogHeader>
  
            <div className="mt-4">
              <Input
                placeholder="Bundle name"
                value={bundleName}
                onChange={(e) => setBundleName(e.target.value)}
              />
               {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
  
            <DialogFooter className="mt-6 flex gap-3">
              
              <Button onClick={handleCreateBundle}>create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isEdit} onOpenChange={setIsEdit}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit bundle</DialogTitle>
              <DialogDescription>
                Enter a name for your question bundle.
              </DialogDescription>
            </DialogHeader>
  
            <div className="mt-4">
              <Input
                placeholder="Bundle name"
                value={bundleName}
                onChange={(e) => setBundleName(e.target.value)}
              />
               {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
  
            <DialogFooter className="mt-6 flex gap-3">
              
              <Button onClick={handleUpdateBundle}>update</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog open={isDelete} onOpenChange={setIsDelete}>
                                           
        
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Delete Event</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Are you sure you want to delete this Bundle? This action cannot be undone.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <button
                                                        onClick={() => setIsDelete(false)}
                                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={handleDeleteBundle}
                                                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 ml-2"
                                                    >
                                                        Delete
                                                    </button>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
        
      </main>
    </div>
  </div>
  </>
  );
}
