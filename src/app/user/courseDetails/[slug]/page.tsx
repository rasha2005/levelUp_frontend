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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { coursePayement, getCourseDetails, raiseCourseTicket } from "@/app/lib/api/userApi";
import CourseBundle from "@/app/utils/interface/CourseBundle";
import Slot from "@/app/utils/interface/Slot";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {loadStripe} from "@stripe/stripe-js"
import Link from "next/link";
import UserHeader from "@/components/user/userHeader";
import UserSidebar from "@/components/user/userSideBar";
import { Flag } from "lucide-react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import QnASection from "@/components/user/QnASection"
interface Instructor {
  id:string;
  name:string;
  img:string | null
}

export default function CourseDetails() {
    const [course , setCourse] = useState<CourseBundle>()
    const [slots , setSlots] = useState<Slot[]>([])
    const [isEnrolled ,setIsEnrolled] = useState(false);
    const [issueType, setIssueType] = useState("")
    const [description, setDescription] = useState("")
    const [isOpen , setIsOpen] = useState(false);
    const [thumbnail, setThumbnail] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [instructor , setInstructor] = useState<Instructor>();
    

      const params = useParams()
      const slug = params.slug?.toString()

      const handlePayement = async(data:any) => {
        const stripe = await loadStripe("pk_test_51QNBlLHvM8RyBLKlTdnmuRb0fRXSonS9jR9Y2LSCdNvx5Ia1FMfhGJ6of1zRags6mYlsNhh3qsPq7u71HX3oWgmt00EuYxiymG");
            if (!stripe) {
              throw new Error("Stripe could not be initialized");
            }
            
            
            const body = {
              details: data,
            };
        
            
            const headers = {
              "Content-Type": "application/json",
            };
        
            
            const response = await coursePayement(headers, body);
        
            if (response.data.success) {
              window.location = response.data.data.res;
            }
            
          
             }

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

      const courseDetails = async() => {
        const data = await getCourseDetails(slug);
        console.log("ds",data)
        if(data.data.response?.isEnrolled){
          setIsEnrolled(true);
        }
        if(data.data.response.success){
    
          setCourse(data.data.response.data);
          setSlots(data.data.response.data.slots)
          setInstructor(data.data.response.data.instructor)
        }
      }

      const handleReportSubmit = async() => {
        const newErrors: { [key: string]: string } = {};
        if (!description.trim()) newErrors.description = "Description is required";
        const data = await raiseCourseTicket(thumbnail , description , slug ,course?.instructorId);
        if(data.data.response.success){
          setIsOpen(false) 
          toast.success("Your report has been submitted successfully!");
        }else{
          toast.error(data.data.response.message);
        }
  
      }

   
      

      const start = course?.startDate ? new Date(course.startDate) : null;
      const end = course?.endDate ? new Date(course.endDate) : null;
      let durationInWeeks = 0;
      if(end && start){
        const diffInMs = end.getTime() - start.getTime();
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        durationInWeeks = Math.ceil(diffInDays / 7); 
      }
  




    useEffect(() => {
      courseDetails()
    },[])
  
    return (
      <>
                <ToastContainer />

      <UserHeader/>
      <UserSidebar/>
      <div className="min-h-screen bg-white">
       
      <div className="bg-[#0F0F0F] h-80 flex items-center">
  <div className="max-w-6xl mx-auto px-8 flex justify-between items-center w-full">
    
    {/* Left side: Course info */}
    <div className="w-1/2 text-white text-left">
      <h1 className="text-4xl font-bold mb-2">{course?.name}</h1>

      {instructor && (
        <p className="text-gray-300 mb-2 flex items-center gap-2">
        By
        <a
          href={`/user/instructorDetail/${instructor?.id}`}
          className="flex items-center gap-2 text-blue-400 hover:underline decoration-blue-400 underline-offset-4"
        >
          <span>{instructor?.name}</span>
        </a>

      </p>
      )}

    </div>

    {/* Right side: Course thumbnail */}
    <div className="w-1/2">
      <div className="bg-white rounded-xl h-64 w-full shadow-lg flex items-center justify-center text-gray-400">
        <img
          src={course?.thumbnail || "/images/default-thumbnail.png"}
          alt={`${course?.name} template`}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    </div>
  </div>
</div>

  
  
        {/* Bottom White Section */}
        {/* Wrapper for consistency */}
<div className="max-w-6xl mx-auto px-8 mt-5">

{/* Top: Overview + Details */}
<div className="flex justify-between items-start gap-12 mb-16">
  {/* Course Overview */}
  <div className="flex-1 max-w-2xl">
    <h2 className="text-2xl font-semibold mb-6">Course Overview</h2>
    <p className="text-gray-700">
      {course?.description}
    </p>
  </div>

  {/* Course Details Box */}
  <div className="bg-white p-6 rounded-xl shadow-xl w-72">
  <div className="w-full h-40 mb-4">
    <img
      src={course?.thumbnail || "/images/default-thumbnail.png"}
      alt={`${course?.name} thumbnail`}
      className="w-full h-full object-cover rounded-lg"
    />
  </div>
    <p className="text-gray-600">Level: Beginner</p>
    <p className="text-gray-600">Duration: {durationInWeeks} Weeks</p>
    <p className="text-gray-600">Students: {course?.participantLimit}</p>
    <p className="text-2xl font-bold my-4">₹{course?.price}</p>
    {isEnrolled ? (
  <button
  onClick={() => setIsOpen(true)}
  className="w-full mt-3 flex items-center justify-center gap-2 border border-gray-700 text-gray-700 py-2 rounded hover:bg-gray-100 transition"
  >
     <Flag size={18} className="text-red-700" />
    Report Course
  </button>
) : (
  <button
    onClick={() => handlePayement(course)}
    className="w-full bg-[#0F0F0F] text-white py-2 rounded hover:bg-gray-800 transition"
  >
    Enroll Now
  </button>
)}
  </div>
</div>

{/* Bottom: Live Sessions */}
<div className="mb-12">
  <h2 className="text-2xl font-semibold mb-4">Live Sessions</h2>
  <div className="space-y-4">
    {slots
      
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .filter((slot, index) => {
        if (isEnrolled) return true; 
        if (course?.isFreeTrial && index === 0) return true; 
        return false; 
      })
      .map((slot, i) => {
        const start = new Date(slot.startTime);
        const end = new Date(slot.endTime);
        const now = new Date();

        const formatDate = (d: Date) =>
          `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;

        const formatTime12 = (d: Date) => {
          let hours = d.getHours();
          const minutes = d.getMinutes();
          const ampm = hours >= 12 ? "PM" : "AM";
          hours = hours % 12 || 12;
          return `${hours}:${String(minutes).padStart(2, "0")} ${ampm}`;
        };

        const date = formatDate(start);
        const time = `${formatTime12(start)} - ${formatTime12(end)}`;

        let buttonText = "Upcoming";
        const fifteenMinutesBefore = new Date(start.getTime() - 15 * 60 * 1000);

        if (now >= fifteenMinutesBefore && now <= end) {
          buttonText = "Join";
        } else if (now > end) {
          buttonText = "Ended";
        }

        const button = (
          <button
            className={`px-4 py-2 rounded transition ${
              buttonText === "Join"
                ? "bg-[#0F0F0F] text-white hover:bg-gray-800"
                : buttonText === "Upcoming"
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-red-500 text-white cursor-not-allowed"
            }`}
            disabled={buttonText !== "Join"}
          >
            {buttonText}
          </button>
        );

        return (
          <div
            key={i}
            className="bg-gray-100 rounded-lg p-4 shadow-sm flex justify-between items-center"
          >
            {/* Slot Info */}
            <div>
              <p className="font-medium text-gray-800">{slot.title}</p>
              <p className="text-sm text-gray-600">
                {date} • {time}
              </p>
            </div>

            {/* Join Button */}
            {buttonText === "Join" ? (
                  <Link href={`/user/room/${slot.roomId}`} passHref>
                    {button}
                  </Link>
                ) : (
                  button
                )}
          </div>
        );
      })}
  </div>
</div>
<div className="mb-12">
  <QnASection courseId={slug} endDate={course?.endDate} startDate={course?.startDate}/>
</div>
</div>


</div>

<Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger >
      
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Report a Problem</DialogTitle>
          <DialogDescription>
            Please describe the issue you’re facing with this course or instructor.
          </DialogDescription>
        </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="attachment">Attachment (optional)</Label>
            <span className="text-xs text-gray-500 block">
            Attach a screenshot or file that helps us understand the issue better.
            </span>
            <Input
              id="attachment"
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleThumbnailChange(e.target.files[0]);
                }
              }}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the issue in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              
            />
            {errors.description && (
        <p className="text-red-500 text-xs">{errors.description}</p>
      )}

          </div>

         
       

        <DialogFooter>
          <Button onClick={handleReportSubmit} className="bg-[#0F0F0F] hover:bg-gray-800">
            Submit Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
</>
    );
  }
  