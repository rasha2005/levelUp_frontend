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

import { getImg } from "@/app/lib/api/userApi";
import { useEffect, useState } from "react";

function UserHeader() {
  const [img , setImg] = useState('');

 const getUserProfile = async() => {
   const img = await getImg();
  if(img.data.response.success) {
    setImg(img.data.response.image);
  }
 }

 useEffect(() => {
  getUserProfile();
 },[])
    return (

        <>
         <header className="flex flex-wrap justify-between items-center p-4 bg-blue-100">
         <div className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0 w-full sm:w-auto text-center sm:text-left text-grey-600 ml-6">
                 LevelUp
            </div>
            <div className="flex justify-center sm:justify-end w-full sm:w-auto mr-7">
            <button 
    className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200 flex items-center space-x-2"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 10h.01M12 10h.01M16 10h.01M21 15.93a10.04 10.04 0 01-9 4.07c-2.485-.376-4.686-1.712-6.25-3.583A10.003 10.003 0 012 6.445a10.04 10.04 0 014.07-9 10.04 10.04 0 019-4.07c2.485.376 4.686 1.712 6.25 3.583a10.003 10.003 0 013.678 6.693A10.04 10.04 0 0121 15.93z"
      />
    </svg>
    <span>Chat</span>
  </button>
            <DropdownMenu>
  <DropdownMenuTrigger className="focus:outline-none">
            <Avatar>
                <AvatarImage src={img} alt="@shadcn"/>
            </Avatar>
            </DropdownMenuTrigger>
  <DropdownMenuContent>
   
    <Link href={'/user/profile'}><DropdownMenuItem>My Account</DropdownMenuItem></Link>
    <Link href={'/user/sessions'}><DropdownMenuItem>Sessions</DropdownMenuItem></Link>
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