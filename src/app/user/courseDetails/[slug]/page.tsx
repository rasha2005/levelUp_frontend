"use client"

import { coursePayement, getCourseData } from "@/app/lib/api/userApi";
import CourseBundle from "@/app/utils/interface/CourseBundle";
import Slot from "@/app/utils/interface/Slot";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {loadStripe} from "@stripe/stripe-js"
import Link from "next/link";
import UserHeader from "@/components/user/userHeader";
import UserSidebar from "@/components/user/userSideBar";

export default function CourseDetails() {
    const [course , setCourse] = useState<CourseBundle>()
    const [slots , setSlots] = useState<Slot[]>([])
    const [isEnrolled ,setIsEnrolled] = useState(false);


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

      const getCourseDetails = async() => {
        const data = await getCourseData(slug);
        if(data.data.response?.isEnrolled){
          setIsEnrolled(true);
        }
        if(data.data.response.success){
    
          setCourse(data.data.response.data);
          setSlots(data.data.response.data.slots)
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
      getCourseDetails()
    },[])
  
    return (
      <>
      <UserHeader/>
      <UserSidebar/>
      <div className="min-h-screen bg-white">
       
  <div className="bg-[#0F0F0F] h-80 flex items-center">
    <div className="max-w-6xl mx-auto px-8 flex justify-between items-center w-full">
     
      <div className="w-1/2 text-white text-left">
        <h1 className="text-4xl font-bold mb-2">{course?.name}</h1>
        <p className="text-lg">"Learn, grow, and achieve — start now"</p>
      </div>

    
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
    <p className="text-2xl font-bold my-4">${course?.price}</p>
    {!isEnrolled && (
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
      // Sort slots by createdAt ascending (oldest first)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      // Filter based on enrollment / free trial
      .filter((slot, index) => {
        if (isEnrolled) return true; // show all slots if enrolled
        if (course?.isFreeTrial && index === 0) return true; // show only first slot if free trial
        return false; // hide all other slots
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

</div>


</div>
</>
    );
  }
  