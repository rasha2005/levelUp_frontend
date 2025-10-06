"use client"

import React, { useEffect, useState } from 'react';
import { Bell, Calendar, BookOpen, X } from 'lucide-react'; 
import UserHeader from '@/components/user/userHeader';
import UserSidebar from '@/components/user/userSideBar';
import { fetchAnnouncementDatas } from '@/app/lib/api/userApi';
import Announcement from '@/app/utils/interface/Announcement';
  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
  } from "@/components/ui/dialog";





export default function Announcements() {
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const [announcements , setAnnoucements] = useState<Announcement[]>([])
    const isOpen = !!selectedAnnouncement;
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7; // You can adjust this
  
    

    const fetchAllAnnouncements = async() => {
        const data = await fetchAnnouncementDatas()
        setAnnoucements(data.data.response.data);
    }
    // Pagination logic
    const totalPages = Math.ceil(announcements.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = announcements.slice(startIndex, startIndex + itemsPerPage);

    const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
    const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
    useEffect(() => {
        fetchAllAnnouncements();
    },[])

    return (
        <>
        <UserHeader/>
        <UserSidebar/>
        <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
            {/* Header */}
            <header className="mb-10 max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center">
                    <Bell className="w-8 h-8 text-cyan-600 mr-3" />
                    Course Announcements
                </h1>
                <p className="text-lg text-gray-500 mt-2">
                    Stay up-to-date with all important news, deadlines, and updates from your instructor.
                </p>
            </header>

            {/* Announcements List */}
            <main className="max-w-4xl mx-auto space-y-5">
            {announcements.map((announcement) => (
                <div
                    key={announcement.id}
                    className="flex items-center justify-between p-5 bg-white border border-gray-200 rounded-xl transition-all duration-300 hover:border-cyan-400 hover:shadow-lg"
                >
                    {/* Left Section: Icon, Title, Excerpt */}
                    <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center mb-1">
                        <Bell className="w-5 h-5 text-cyan-600 mr-3" />
                        <h3 className="text-lg font-bold text-gray-900 truncate">
                        {announcement.title}
                        </h3>
                    </div>

                    {/* Meta Info: Date, Instructor, Course */}
                    <div className="flex flex-wrap items-center text-sm text-gray-500 mt-1 mb-2 gap-2">
                        <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>
                            {new Date(announcement.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            })}
                        </span>
                        </div>

                        {announcement.instructor?.name && (
                        <span className="px-2 py-0.5 text-xs font-medium text-cyan-700 bg-cyan-100 rounded-full">
                            {announcement.instructor.name}
                        </span>
                        )}

                        {announcement.course?.name && (
                        <span className="px-2 py-0.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-full">
                            {announcement.course.name}
                        </span>
                        )}
                    </div>

                    {/* Message */}
                    <p className="text-gray-600 text-sm line-clamp-2 mt-2">
                        {announcement.message}
                    </p>
                    </div>
  



                        {/* Right Section: Button */}
                        <div>
                        <Dialog>
                    <DialogTrigger asChild>
                    <button
                               
                                className="flex items-center px-4 py-2 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition-colors duration-200 shadow-md"
                            >
                                <BookOpen className="w-4 h-4 mr-2" />
                                View Details
                            </button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Announcement Details</DialogTitle>
                            <DialogDescription>
                            </DialogDescription>
                        </DialogHeader>

                        <div className="mt-4 space-y-4">
                            <div>
                            <h3 className="text-sm font-semibold text-gray-700">Description</h3>
                            <p className="text-gray-600 mt-1 whitespace-pre-wrap">
                                {announcement.message || "No description provided."}
                            </p>
                            </div>

                           
                        </div>
                        </DialogContent>
                    </Dialog>
                           
                        </div>
                    </div>
                ))}
            </main>

            {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-cyan-600 text-white hover:bg-cyan-700"
              }`}
            >
              Previous
            </button>
            <span className="text-gray-700 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-cyan-600 text-white hover:bg-cyan-700"
              }`}
            >
              Next
            </button>
          </div>
        )}
        </div>
        </>
    )
}