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
<header className="flex flex-wrap justify-between items-center p-4 bg-[#0F0F0F] shadow-md">
<Link href={'/user/home'}>
          <div className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0 w-full sm:w-auto text-center sm:text-left text-white ml-6 tracking-wide">
          LevelUp
            </div>
          </Link>
            <div className="flex justify-center sm:justify-end w-full sm:w-auto mr-7">
           
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