"use client"

// import { useRouter } from 'next/navigation';
import { getCategoryData, updateInstructor } from "@/app/lib/api/instructorApi";
import Header from "@/components/header/Header";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface catData {
  id?:string;
  catName:string;
}
interface sumbitData {
  description : string;
  experienceCategory :string;
  experienceCertificate :string;
  resume:string;
}

export default function Validation() {
  const {register , handleSubmit , formState:{errors , isValid},watch} = useForm();
  const [catData , setCatData] = useState<catData[]>([]);
  const [eCertificate , setECertificate] = useState('');
  const [resumeFile , setResumeFile] = useState('');
  const router = useRouter();


  const getCatData = async() => {
    try{
      console.log("is it here")
      const res = await getCategoryData();
      console.log("res" , res);
      if(res){
        setCatData(res.data.response.res);
      }

    }catch(err) {
      console.log(err);
    }
  }

  const onsubmit = async(data:sumbitData) => {
   console.log("data",data);
    const updatedData = {
      ...data,
      experienceCertificate:eCertificate,
      resume:resumeFile
    }
    
    const {description , experienceCategory ,experienceCertificate , resume} = updatedData;
    const res = await updateInstructor(description , experienceCategory ,experienceCertificate , resume);
    if(res.data.response.success === true) {
      router.push('/instructor');
    }

  }

  const postEcertificate = (file:any) => {
    console.log("file1" , file)
     if(file === undefined) {
      console.log("undefined")
      return;
     }

     if(file) {
      const data = new FormData();
      data.append("file" , file);
      data.append("upload_preset" , "levelup-full");
      data.append("cloud_name" , "levelup-full");

      fetch("https://api.cloudinary.com/v1_1/levelup-full/image/upload",{
        method:'post',
        body:data,
      }).then((res) => res.json())
      .then(data => {
        console.log("haha");
        setECertificate(data.url.toString());
      })
      .catch((err) => {
        console.log(err);
      } );

      
         }else{
          console.log()
         }
  }

  const postResume = (file:any) => {
    console.log("file" , file)
    if(file === undefined) {
      console.log("undefined")
      return;
    }

    if(file) {
      const data = new FormData();
      data.append("file" , file);
      data.append("upload_preset" , "levelup-full");
      data.append("cloud_name" , "levelup-full");

      fetch("https://api.cloudinary.com/v1_1/levelup-full/image/upload",{
        method:'post',
        body:data,
      }).then((res) => res.json())
      .then(data => {
        console.log("haha");
        setResumeFile(data.url.toString());
      })
      .catch((err) => {
        console.log(err);
      } );

      
         }else{
          console.log()
         }
  }

    useEffect(() => {
      console.log("in the useEffect??");
      getCatData();
    },[])
    return (
        <>
        <Header isLogin = {true}/>
        
        <div className="flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-lg p-8 shadow-lg">
          <CardHeader className="items-center">
          <CardTitle>Instructor Application</CardTitle>
            <CardDescription>Please fill in the details to apply as an instructor</CardDescription>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
          <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
             
              

             {/* Description */}
<div>
  <label className="block text-sm font-medium text-gray-700">About Yourself</label>
  <textarea
    {...register("description", { required: "Description is required" })}
    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
    rows={4}
  />
  {errors.description && typeof errors.description.message === "string" && (
    <span className="text-red-600">{errors.description.message}</span>
  )}
</div>

{/* Category */}
<div>
  <label className="block text-sm font-medium text-gray-700">Experience Category</label>
  <select
    {...register("experienceCategory", { required: "Experience category is required" })}
    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
  >
    <option value="">Select a category</option>
    {catData.map((data) => (
      <option key={data.id} value={data.catName}>{data.catName}</option>
    ))}
  </select>
  {errors.experienceCategory && typeof errors.experienceCategory.message === "string" && (
    <span className="text-red-600">{errors.experienceCategory.message}</span>
  )}
</div>

{/* Experience Certificate Upload */}
<div>
  <label className="block text-sm font-medium text-gray-700">Experience Certificate</label>
  <input
    type="file"
    {...register("experienceCertificate", { required: "Experience certificate is required" })}
    className="mt-1 w-full"
    onChange={(e) => {
      if (e.target.files && e.target.files[0]) {
        postEcertificate(e.target.files[0]);
      }
    }}  />
  {errors.experienceCertificate && typeof errors.experienceCertificate.message === "string" && (
    <span className="text-red-600">{errors.experienceCertificate.message}</span>
  )}
</div>

{/* Resume Upload */}
<div>
  <label className="block text-sm font-medium text-gray-700">Resume</label>
  <input
    type="file"
    {...register("resume", { required: "Resume is required" })}
    className="mt-1 w-full"
    onChange={(e) => {
      if (e.target.files && e.target.files[0]) {
        postResume(e.target.files[0]);
      }
    }}
  />
  {errors.resume && typeof errors.resume.message === "string" && (
    <span className="text-red-600">{errors.resume.message}</span>
  )}
</div>

{/* Submit Button */}
<button
  type="submit"
  className="mt-4 bg-sky-900 text-white px-4 py-2 rounded-full shadow hover:bg-sky-950 w-full"
>
  Submit Application
</button>

            </form>
            </CardContent>
            </Card>
            </div>
            
        </>
    )
}