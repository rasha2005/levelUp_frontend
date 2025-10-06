"use client";

import { useState } from "react";
import { Bell, BookOpen, Home, LogOut, Menu, MessageCircle, User, X } from "lucide-react";
import LogoutButton from "../common/logout";

export default function UserSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
   {!isOpen && (
   <button
   className="p-2 fixed top-[80px] left-8 z-50 text-[#0F0F0F] bg-white rounded-md shadow-md"
   onClick={() => setIsOpen(true)}
 >
   <Menu size={20} />
 </button>
  )}

  {/* Sidebar */}
  <div
    className={`fixed top-0 left-0 h-full w-64 bg-[#0F0F0F] text-white transform ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    } transition-transform duration-300 z-40`}
  >
    <div className="flex items-center justify-between p-4 font-bold text-lg">
      <span>LevelUp</span>
      {/* Close button inside the sidebar header */}
      <button
        onClick={() => setIsOpen(false)}
        className="p-2 rounded-md bg-white text-[#0F0F0F] shadow-md"
      >
        <X size={20} />
      </button>
    </div>

    <nav className="flex flex-col gap-4 p-4 flex-1">
    <a href="/user/home" className="flex items-center gap-2 hover:underline">
      <Home size={18} /> Home
    </a>
    <a href="/user/sessions" className="flex items-center gap-2 hover:underline">
      <BookOpen size={18} /> Sessions
    </a>
    <a href="/user/profile" className="flex items-center gap-2 hover:underline">
      <User size={18} /> Account
    </a>
    <a href="/chat" className="flex items-center gap-2 hover:underline">
    <MessageCircle size={18} /> Chat
  </a>
  <a href="/user/announcements" className="flex items-center gap-2 hover:underline">
    <Bell size={18} /> Announcements
  </a>
  </nav>
  <div className="p-4 border-t border-gray-700">
    <div className="flex items-center gap-2 text-red-400 hover:text-red-500 cursor-pointer">
      <LogOut size={18} />
      <LogoutButton role="user" />
    </div>
  </div>
</div>

  {/* Overlay */}
  {isOpen && (
    <div
      className="fixed inset-0 bg-black/40 z-30"
      onClick={() => setIsOpen(false)}
    />
  )}
</>
  );
}
