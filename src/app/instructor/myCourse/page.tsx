"use client"

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
  } from "@/components/ui/dialog"
import Navbar from "@/components/instructor/Navbar";
import Sidebar from "@/components/instructor/Sidebar";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { createCourseBundle, getCourseData, updateBundleStatus } from "@/app/lib/api/instructorApi";
import CourseBundle from "@/app/utils/interface/CourseBundle";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";

export default function MyCourse() {
  const [isOpen , setIsOpen] = useState(false);
  const [bundleName, setBundleName] = useState("");
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [participantLimit, setParticipantLimit] = useState<number | "">("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isFreeTrial, setIsFreeTrial] = useState(false);
  const [bundles , setBundles] = useState<CourseBundle[]>([]);
  const [isPublish , setIsPublish] = useState<boolean>(false)

  const handleThumbnailChange = (file:File) => {
    const data = new FormData();
        data.append("file" , file);
        data.append("upload_preset" , "levelup-full");
        data.append("cloud_name" , "levelup-full");
  
        fetch("https://api.cloudinary.com/v1_1/levelup-full/image/upload",{
          method:'post',
          body:data,
        }).then((res) => res.json())
        .then(data => {
            setThumbnail(data.url);
         
         
        })
        .catch((err) => {
          console.log(err);
        } );

  };

  const handleCreateBundle = async() => {
    
    const newErrors: { [key: string]: string } = {};
  
    if (!bundleName.trim()) newErrors.bundleName = "Bundle name is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!price || price < 0) newErrors.price = "Price must be >= 0";
    if (!participantLimit || participantLimit <= 0) newErrors.participantLimit = "Set a valid participant limit";
    if (!startDate) newErrors.startDate = "Start date is required";
    if (!endDate) newErrors.endDate = "End date is required";
    
    
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (end < start) newErrors.endDate = "End date cannot be earlier than start date";
    }

  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length > 0) return;
  
    
    const bundleData: CourseBundle = {
        name: bundleName,
        thumbnail,
        description,
        price,
        participantLimit,
        startDate,
        endDate,
        isFreeTrial,
        
      };
      const data = await createCourseBundle(bundleData);
      if(data.data.response.success){
        setBundles((prevBundles) => [...prevBundles, data.data.response.data]);
        toast.success(data.data.response.message)
      }else{
        toast.error(data.data.response.message)
      }

     setIsOpen(false);
     setBundleName("");
     setDescription("");
     setEndDate('');
     setStartDate('');
     setPrice('')
     setParticipantLimit('');
     setThumbnail(null)
  };

  const handlePublish = async(bundleId:string | undefined) => {
    const data = await updateBundleStatus(bundleId);
    if(data.data.response.success) {
      setIsPublish(true)
      toast.success("Published successfully");
    }else{
      toast.error(data.data.response.message);
    }
    setIsPublish(false)
  }

  const getCourses = async() => {
    const data = await getCourseData();
    setBundles(data.data.response.data)
  }

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
 

  useEffect(() => {
    getCourses()
  },[])
    return <>
      <ToastContainer/>
   <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="flex">
      <Sidebar />

       

        <main className="flex-1 p-6">
          <h1 className="text-2xl font-semibold mb-6">My Courses</h1>

         
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
           
            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl bg-white hover:shadow-md transition cursor-pointer p-6">
              <div className="flex flex-col items-center gap-2 text-gray-600">
                <Plus onClick={() => setIsOpen(true)} size={28} />
                <span className="font-medium">Create New Bundle</span>
              </div>
            </div>

           
            {bundles?.map((bundle) => (
  <div
    key={bundle.id}
    className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4 flex flex-col"
  >
    <div className="w-full h-25 mb-2">
  <img
    src={bundle.thumbnail || "/images/default-thumbnail.png"}
    alt={bundle.name}
    className="w-full h-full object-cover rounded-xl"
  />
</div>
<div className="flex justify-between items-start">
    <div>
      <h2 className="text-lg font-semibold mb-2">{bundle.name}</h2>
      <p className="text-sm text-gray-500 mb-4">
        {bundle.sessionCount} Sessions
      </p>
    </div>

    <div>
    {bundle?.status === "published" ? (
  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
    Published
  </span>
) : (bundle?.sessionCount ?? 0) > 0 ? (
  <>
  <button
    className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200"
    onClick={() => setIsPublish(true)}
    
  >
    Publish
  </button>

    <Dialog open={isPublish} onOpenChange={setIsPublish}>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Publish Course</DialogTitle>
      </DialogHeader>
      <p className="text-sm text-gray-600">
        Are you sure you want to publish <b>{bundle.name}</b>?  
        Once published, students will be able to see and enroll in it.
      </p>
  
      <DialogFooter className="mt-4 flex gap-3">
        <Button
          onClick={() => handlePublish(bundle.id)}
  
        >
          Confirm Publish
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  </>
) : (
  <span className="px-2 py-1 text-xs rounded-full bg-gray-300 text-gray-700 cursor-not-allowed">
    Draft
  </span>
)}
    </div>
  </div>
  <Link
  href={`/instructor/course/${bundle.id}`}
  className="mt-auto w-full px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-700 text-center inline-block"
>
  Manage
</Link>
  </div>
  

))}
          </div>
        </main>
      </div>
    </div>

    <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogContent className="sm:max-w-md max-h-[97vh] overflow-y-auto custom-scroll">
                <DialogHeader>
                  <DialogTitle>Create a new bundle</DialogTitle>
                  <DialogDescription>
                    Enter a name for your question bundle.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
  <Input 
    placeholder="Bundle name" 
    value={bundleName} 
    onChange={(e) => setBundleName(e.target.value)} 
  />
  {errors.bundleName && <p className="text-red-500 text-xs">{errors.bundleName}</p>}

  <div className="flex flex-col space-y-1">
    <label className="text-gray-800 text-sm">Thumbnail</label>
    <p className="text-gray-700 text-xs">Set a thumbnail that stands out and draws viewers' attention.</p>
    <Input type="file" accept="image/*" onChange={(e) => {
      if (e.target.files && e.target.files[0]) {
        handleThumbnailChange(e.target.files[0]);
      }
    }} />
  </div>

  <Textarea 
    placeholder="Short description" 
    value={description} 
    onChange={(e) => setDescription(e.target.value)}
  />
  {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}

 

  <div className="mb-4">
  <label className="block text-gray-700 text-sm font-medium mb-1">
    Price
  </label>
  <Input 
    type="number" 
    placeholder="Enter price" 
    value={price} 
    onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
  />
  {errors.price && (
    <p className="text-red-500 text-xs">{errors.price}</p>
  )}
</div>

<div className="mb-4">
  <label className="block text-gray-700 text-sm font-medium mb-1">
    Participant Limit
  </label>
  <Input 
    type="number" 
    placeholder="Enter participant limit" 
    value={participantLimit} 
    onChange={(e) => setParticipantLimit(e.target.value === "" ? "" : Number(e.target.value))}
  />
  {errors.participantLimit && (
    <p className="text-red-500 text-xs">{errors.participantLimit}</p>
  )}
</div>

<div className="flex gap-3">
  <div className="flex flex-col w-full">
    <label className="text-gray-700 text-sm font-medium mb-1">
      Start Date
    </label>
    <Input 
      type="date" 
      value={startDate} 
      onChange={(e) => setStartDate(e.target.value)} 
    />
    {errors.startDate && <p className="text-red-500 text-xs">{errors.startDate}</p>}
  {errors.endDate && <p className="text-red-500 text-xs">{errors.endDate}</p>}
  </div>

  <div className="flex flex-col w-full">
    <label className="text-gray-700 text-sm font-medium mb-1">
      End Date
    </label>
    <Input 
      type="date" 
      value={endDate} 
      onChange={(e) => setEndDate(e.target.value)} 
    />

  </div>
</div>


  <div className="flex items-center gap-2">
    <span className="text-gray-700 text-xs">Turn on Free Trial for first session</span>
    <Switch checked={isFreeTrial} onCheckedChange={setIsFreeTrial} />
  </div>

  <DialogFooter className="mt-6 flex gap-3">
    <Button onClick={handleCreateBundle}>Create</Button>
    
  </DialogFooter>
</div>

                
              </DialogContent>
            </Dialog>

            
    </>
}