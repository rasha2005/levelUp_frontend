"use client"

import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useForm } from "react-hook-form";
import { editCatData } from "@/app/lib/api/adminApi";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";

interface CatData {
    categoryName:string
}

function EditCategory() {
    const params = useParams();
    const searchParams = useSearchParams();

    
    const id = params.slug; 
    const name = searchParams.get("name"); 
    const router = useRouter();

    console.log("id , name" , id , name);
    const { register, handleSubmit, formState: { errors } } = useForm<CatData>({
        defaultValues: { categoryName: name || "" }
      });

      const onSubmit = async(data:CatData) => {
        const {categoryName} = data;
        const res = await editCatData(categoryName , id);
        if(res.data.response.success === true) {
            console.log("ehhe");
            router.push('/admin/category')
        }else{
            toast.error(res.data.response.message);
        }
      }
    return (
        <>
        <ToastContainer/>
        <div className="mt-10 mx-auto max-w-md"> 
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Edit Category</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="categoryName" className="text-sm font-medium">
                  Category Name
                </label>
                <input
                  type="text"
                  id="categoryName"
                  {...register("categoryName", { 
                    required: "Category name is required", 
                    validate: {
                        notEmpty: value => value.trim() !== '' || "Category name cannot be just spaces",
                        isString: value => /^[A-Za-z\s]+$/.test(value) || "Category name must contain only letters"
                      }
                  })}
                  placeholder="Enter category name"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                />
                {errors.categoryName && (
                  <span className="text-red-600">{errors.categoryName.message}</span>
                )}
                </div>
              </div>
            
          
            <button className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-800 mt-8">
              Create
            </button>
          
          </form>
          </CardContent>
        </Card>
      </div>
      </>
    )
}

export default EditCategory;