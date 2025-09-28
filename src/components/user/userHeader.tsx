"use client"

import { Avatar , AvatarFallback ,AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Link from "next/link";
import LogoutButton from "../common/logout";

import { clearAllNotifications, getImg, getUserNotification } from "@/app/lib/api/userApi";
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

export interface Notification {
  id: string;           
  userId: string;        
  title: string;          
  message: string;      
  isRead: boolean;        
  createdAt: Date;       
}

function UserHeader() {
  const [img , setImg] = useState('');
  const [notification , setNotification] = useState<Notification[]>([])

  const clearAll = async() => {
    await clearAllNotifications();
    setNotification([]);
  }

 const getUserProfile = async() => {
   const img = await getImg();
  if(img.data.response.success) {
    setImg(img.data.response.image);
  }
 }

 const getNotification = async() => {
  const data = await getUserNotification();
  setNotification(data.data.response.data);
 }
 useEffect(() => {
  getUserProfile();
  getNotification()
 },[])
    return (

        <>
<header className="flex flex-wrap justify-between items-center p-4 bg-[#0F0F0F] shadow-md">
<Link href={'/user/home'}>
          <div className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0 w-full sm:w-auto text-center sm:text-left text-white ml-6 tracking-wide">
          LevelUp
            </div>
          </Link>
           

            <div className="flex items-center justify-center sm:justify-end w-full sm:w-auto mr-7 space-x-4">
    {/* Notification Icon */}
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none relative">
        <Bell className="w-6 h-6 text-white cursor-pointer" />
        {notification.length > 0 && (
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white text-xs font-bold flex items-center justify-center rounded-full">
    {notification.length}
  </span>        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80">
        <div className="flex justify-between items-center px-3 py-2">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <button
            className="text-sm text-blue-600 hover:underline"
            onClick={clearAll}
          >
            Clear All
          </button>
        </div>
        <DropdownMenuSeparator />

        {notification.length === 0 ? (
          <DropdownMenuItem className="text-gray-500">No notifications</DropdownMenuItem>
        ) : (
          notification.map((notif) => (
            <DropdownMenuItem key={notif.id} className="flex flex-col text-left">
              <span className="font-semibold">{notif.title}</span>
              <span className="text-sm text-gray-600">{notif.message}</span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
            <DropdownMenu>
  <DropdownMenuTrigger className="focus:outline-none">
            <Avatar>
                <AvatarImage src={img} alt="@shadcn"/>
            </Avatar>
            </DropdownMenuTrigger>
  <DropdownMenuContent>
   
    <Link href={'/user/profile'}><DropdownMenuItem>My Account</DropdownMenuItem></Link>
    <Link href={'/user/sessions'}><DropdownMenuItem>Sessions</DropdownMenuItem></Link>
    <Link href={'/chat'}><DropdownMenuItem>Chat</DropdownMenuItem></Link>
    <DropdownMenuSeparator />
    <DropdownMenuLabel ><LogoutButton role="user"/></DropdownMenuLabel>
   
  </DropdownMenuContent>
</DropdownMenu>
            </div>
        </header>
        </>
    )
}

export default UserHeader;