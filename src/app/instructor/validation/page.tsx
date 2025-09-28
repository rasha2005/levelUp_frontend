"use client"

// import { useRouter } from 'next/navigation';
import { getCategoryData, getInstructorDetails, updateInstructor } from "@/app/lib/api/instructorApi";
import Header from "@/components/header/Header";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Command,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
  } from "@/components/ui/command";
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
  const {register , handleSubmit , formState:{errors , isValid},watch , reset} = useForm<sumbitData>();
  const [catData , setCatData] = useState<catData[]>([]);
  const [eCertificate , setECertificate] = useState('');
  const [resumeFile , setResumeFile] = useState('');
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [newSpec, setNewSpec] = useState("");
  const [loading, setLoading] = useState(false);
  const allSpecs = [
    "Math",
    "IELTS",
    "Physics",
    "Biology",
    "Chemistry",
    "English",
    "Computer Science",
    "Web Development",
    "Data Science",
    "Artificial Intelligence",
    "Machine Learning",
    "Business Studies",
    "Economics",
    "Accounting",
    "Marketing",
  ]

  const router = useRouter();

  const handleAdd = (spec: string) => {
    if (
      spec &&
      !specializations.some((s) => s.toLowerCase() === spec.toLowerCase())
    ) {
      setSpecializations((prev) => [...prev, spec]);
      setNewSpec("");
    }
  };

  const getCatData = async() => {
    try{
      const res = await getCategoryData();
      if(res){
        setCatData(res.data.response.res);
      }

    }catch(err) {
      console.log(err);
    }
  }

  const getInsrutorData = async() => {
    try{
      const data = await getInstructorDetails()
      const instructor = data.data.response.res
      reset({
        description: instructor.description || '',
        experienceCategory: instructor.category || '',
      });
    }catch(err) {
      console.log(err);
    }
  }

  const onsubmit = async(data:sumbitData) => {
    const updatedData = {
      ...data,
      experienceCertificate:eCertificate,
      resume:resumeFile,
      specialization:specializations
    }
    
    const {description , experienceCategory ,experienceCertificate , resume ,specialization} = updatedData;
    setLoading(true)
    const res = await updateInstructor(description , experienceCategory ,experienceCertificate , resume ,specialization);
    if(res.data.response.success === true) {
      router.push('/instructor');
    }
    setLoading(false)
  }

  const postEcertificate = (file:File) => {
     if(file === undefined) {
      return;
     }

     if(file) {
      const data = new FormData();
      data.append("file" , file);
      data.append("upload_preset" , "levelup-full");
      data.append("cloud_name" , "levelup-full");
      setLoading(true);
      fetch("https://api.cloudinary.com/v1_1/levelup-full/raw/upload",{
        method:'post',
        body:data,
      }).then((res) => res.json())
      .then(data => {
        console.log("data",data)
        setLoading(false)
        setECertificate(data.secure_url.toString());
      })
      .catch((err) => {
        console.log(err);
      } );

      
         }
  }

  const postResume = (file:File) => {
    if(file === undefined) {
      return;
    }

    if(file) {
      const data = new FormData();
      data.append("file" , file);
      data.append("upload_preset" , "levelup-full");
      data.append("cloud_name" , "levelup-full");
      setLoading(true);
      fetch("https://api.cloudinary.com/v1_1/levelup-full/raw/upload",{
        method:'post',
        body:data,
      }).then((res) => res.json())
      .then(data => {
        setLoading(false);
        setResumeFile(data.url.toString());
      })
      .catch((err) => {
        console.log(err);
      } );

      
         }
  }

    useEffect(() => {
      getCatData();
      getInsrutorData();
    },[])
    return (
        <>
        <Header isLogin = {true}/>
        
        <div className="flex justify-center items-start min-h-screen bg-gray-50 py-10">
        <Card className="w-full max-w-lg p-8 shadow-lg min-h-[70vh]">
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
<div>
<label className="block text-sm font-medium text-gray-700 mb-2">
        Specializations
      </label>

      <Command className="border rounded">
        <CommandInput
          placeholder="e.g. Math, IELTS"
          value={newSpec}
          onValueChange={setNewSpec}
        />
        {newSpec && (
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {allSpecs
                .filter(
                  (s) =>
                    s.toLowerCase().includes(newSpec.toLowerCase()) &&
                    !specializations.includes(s)
                )
                .map((s) => (
                  <CommandItem key={s} onSelect={() => handleAdd(s)}>
                    {s}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        )}
      </Command>

      {/* Add button for custom value */}
      <button
        type="button"
        className="px-3 py-2 bg-sky-800 text-white rounded mt-2"
        onClick={() => handleAdd(newSpec)}
      >
        Add
      </button>
</div>

{/* Show added items */}
<div className="flex flex-wrap gap-2 mt-3">
  {specializations.map((spec, idx) => (
    <span
      key={idx}
      className="px-2 py-1 bg-gray-200 rounded-full text-sm flex items-center gap-2"
    >
      {spec}
      <button
        type="button"
        className="text-red-600 hover:text-red-800"
        onClick={() =>
          setSpecializations((prev) => prev.filter((_, i) => i !== idx))
        }
      >
        ✕
      </button>
    </span>
  ))}
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
  disabled={loading}
  className={`w-full py-2 px-4 font-semibold rounded transition-colors 
    ${loading
      ? "bg-gray-400 text-white cursor-not-allowed"
      : "bg-[#0F0F0F] text-white hover:bg-gray-800"}`}
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