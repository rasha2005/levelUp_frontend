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
import { useEffect, useState } from "react";
import { getImg } from "@/app/lib/api/instructorApi";


 const Navbar = () => {
  const [img ,setImg] = useState('');

  const getInstructorImg = async() => {
    const img = await getImg();
    if(img.data.response.image){
      setImg(img.data.response.image)
    }
  }
 
    useEffect(() => {
      getInstructorImg();
    },[])
    return ( 
        <div className="bg-[#57534e]  text-white py-4 px-10 flex justify-between w-full " >
            LevelUp
            <DropdownMenu>
  <DropdownMenuTrigger className="focus:outline-none">
            <Avatar>
                <AvatarImage src={img} alt="@shadcn"/>
                <AvatarFallback>I</AvatarFallback>
            </Avatar>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
  <Link href={'/instructor/profile'}><DropdownMenuItem>My Account</DropdownMenuItem></Link>
  <Link href={'/instructor/wallet'}><DropdownMenuItem>Wallet</DropdownMenuItem></Link>
  <Link href={'/chat'}><DropdownMenuItem>Chat</DropdownMenuItem></Link>
    <DropdownMenuSeparator />
   
    <DropdownMenuItem><LogoutButton role="instructor"/></DropdownMenuItem>
   
  </DropdownMenuContent>
</DropdownMenu>
        </div>
    );
}
 
export default Navbar;