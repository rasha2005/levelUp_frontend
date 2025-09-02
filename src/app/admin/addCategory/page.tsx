"use client"

import { useForm } from "react-hook-form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { createCategory } from "@/app/lib/api/adminApi";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/admin/Sidebar";

 
 

  interface Category {
    name:string;
  }

 function AddCategory() {
    const {register , handleSubmit , formState:{errors } , reset} = useForm<Category>();
    const router = useRouter();

    const onSubmit = async(data:Category) => {
        const {name} = data;
        reset();
        const res = await createCategory(name);
        if(res.data.response.success === true) {
            router.push('/admin/category')
        }else{
            toast.error(res.data.response.message);
        }

    }


    

    return (  
        <>
        <ToastContainer/>
        <div className="h-screen ">
            <div className="w-full">
                <Navbar />
            </div>
            <div className="flex">
                <div className="w-[250px]">
                    <Sidebar />
                </div>

                <div className="flex-1 p-10">
        <div className="mt-10 mx-auto max-w-md"> 
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Add Category</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <form  onSubmit={handleSubmit(onSubmit)} className="mt-3">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="categoryName" className="text-sm font-medium">
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="categoryName"
                    {...register('name', {required: true, validate: {notEmpty: value => value.trim() !== '' || 'category name cannot be just spaces'}})}
                    placeholder="Enter category name"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  />
                    {errors.name && <span className="text-red-600">This field is required</span>}
                </div>
              </div>
            
          
            <button className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-800 mt-8">
              Create
            </button>
          
          </form>
          </CardContent>
        </Card>
      </div>
      </div>
      </div>
      </div>
      </>
     
    );
}
 
export default AddCategory 