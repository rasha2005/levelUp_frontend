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

function UserHeader() {
    return (

        <>
         <header className="flex flex-wrap justify-between items-center p-4 bg-blue-100">
         <div className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0 w-full sm:w-auto text-center sm:text-left text-grey-600 ml-6">
                 LevelUp
            </div>
            <div className="flex justify-center sm:justify-end w-full sm:w-auto mr-7">
            <DropdownMenu>
  <DropdownMenuTrigger className="focus:outline-none">
            <Avatar>
                <AvatarImage src="/images/defaultProfile.jpg" alt="@shadcn"/>
            </Avatar>
            </DropdownMenuTrigger>
  <DropdownMenuContent>
   
    <Link href={'/user/profile'}><DropdownMenuItem>My Account</DropdownMenuItem></Link>
    <DropdownMenuSeparator />
    <DropdownMenuLabel>Logout</DropdownMenuLabel>
   
  </DropdownMenuContent>
</DropdownMenu>
            </div>
        </header>
        </>
    )
}

export default UserHeader;