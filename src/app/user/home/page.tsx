"use client";

import { getCategoryData, getHighRatingCourse, getInstructorDetails, getLatestCourses, getPopularInstrcutors } from "@/app/lib/api/userApi";
import { useEffect, useState } from "react";
import UserHeader from "@/components/user/userHeader";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaStar , FaArrowRight } from "react-icons/fa";
import UserSidebar from "@/components/user/userSideBar";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CourseBundle from "@/app/utils/interface/CourseBundle";
import InstructorData from "@/app/utils/interface/InstrcutorData";
import { ArrowRight } from "lucide-react";




export default function Home() {

  const [courses , setCourses] = useState<CourseBundle[]>([])
  const [latestCourse , setLatestCourse] = useState<CourseBundle[]>([])
  const [popularInstructor , setPopularInstructor] = useState<InstructorData[]>([])
  const [isLoading , setIsLoading] = useState(false);

const getBannerData = async() => {
  const data = await getHighRatingCourse();
  setCourses(data.data.response.data);
  const lCourse = await getLatestCourses();
  setLatestCourse(lCourse.data.response.data)
  const pInstrcutor = await getPopularInstrcutors();
  setPopularInstructor(pInstrcutor.data.response.data)
  setIsLoading(false);
}
 useEffect(() => {
  setIsLoading(true)
  getBannerData();
 },[])

  return (
    <div className="flex flex-col min-h-screen">
      <UserHeader />

      <UserSidebar />

      <main className="flex-1">
      <section className="bg-[#0F0F0F] text-white pb-10"> 
  <Carousel className="w-full max-w-7xl mx-auto relative">
    <CarouselContent>
      
      {courses.map((course) => (
        <CarouselItem key={course.id} className="p-0">
          <div className="relative w-full h-[600px] rounded-2xl overflow-hidden">
            {/* Full Thumbnail */}
            <img
              src={course.thumbnail || "default-thumbnail.png"}
              alt={course.name}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

            {/* Course Info Overlay */}
            <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                {course.name}
              </h2>
              <p className="text-gray-200 mb-6 line-clamp-3">
                {course.description}
              </p>
              {/* Example button or call-to-action */}
              <div className="flex gap-3">
                <Link href={`/user/courseDetails/${course.id}`}>
                <button className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-white/30 hover:bg-gray-700 transition">
                  Learn More
                </button>
                </Link>
              </div>
            </div>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>

    {/* Navigation Arrows on top of carousel */}
    <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-6 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-3" />
    <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-6 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-3" />
  </Carousel>
</section>



   {/* Courses + Instructors Section */}
<section className="py-12 bg-white">
  <div className="max-w-7xl mx-auto px-6">
  <div className="flex items-center justify-between mb-6">
  <h2 className="text-2xl font-bold">Popular Courses</h2>

  {latestCourse.length === 6 && (
    <Link
      href="/user/courses"
      className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-semibold transition-colors"
    >
      View all
      <ArrowRight className="w-4 h-4 ml-1" />
    </Link>
  )}
</div>
{isLoading ? (
      <div className="max-w-7xl mx-auto p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
        ))}
      </div>
    ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
    {latestCourse.map((course) => (
        <div
        key={course.id}
        className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all overflow-hidden"
      >
        {/* Thumbnail */}
        <img
          src={course.thumbnail || "/images/default-thumbnail.png"}
          alt={course.name}
          className="w-full h-48 object-cover"
        />
    
        {/* Course Details */}
        <div className="p-5 space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {course.name}
          </h3>
    
          <div className="flex items-center justify-between">
            {/* Price and Trial */}
            <div>
              <p className="text-gray-700 font-medium">
                ₹{course.price ? course.price.toLocaleString() : "Free"}
              </p>
    
              {course.isFreeTrial && (
                <span className="mt-1 inline-block px-2.5 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                  Free Trial Available
                </span>
              )}
            </div>
    
            {/* View Button */}
            <Link href={`/user/courseDetails/${course.id}`}>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all"
            >
              View
            </button>
            </Link>
          </div>
        </div>
      </div>
      ))}
    </div>
    )}

    <div className="flex items-center justify-between mb-6">
  <h2 className="text-2xl font-bold">Top Instructors</h2>
  {popularInstructor.length === 4 && (
    <Link
      href="/user/instructors"
      className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-semibold transition-colors"
    >
      View all
      <ArrowRight className="w-4 h-4 ml-1" />
    </Link>
  )}
</div>
    
{isLoading ? (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    {[...Array(4)].map((_, i) => (
      <div
        key={i}
        className="h-48 bg-gray-200 rounded-xl animate-pulse"
      ></div>
    ))}
  </div>
) : (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    {popularInstructor.map((inst) => (
      <div
        key={inst.id}
        className="text-center bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
      >
        {/* Profile Image */}
        <img
          src={inst.img || "/images/defaultProfile.jpg"}
          alt={inst.name}
          className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
        />

        {/* Instructor Info */}
        <h3 className="font-semibold text-gray-900">{inst.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{inst.category} coach</p>

        {/* Rating */}
        <div className="flex items-center justify-center gap-1">
          <span className="text-yellow-500">★</span>
          <span className="text-sm font-medium text-gray-700">
            {inst.rating ? inst.rating.toFixed(1) : "N/A"}
          </span>
        </div>
      </div>
    ))}
  </div>
)}

  </div>
</section>
</main>
<footer className="bg-gray-800 text-gray-200 py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 levelUp. All rights reserved.</p>
        </div>
      </footer>
   
    </div>


  );
}
