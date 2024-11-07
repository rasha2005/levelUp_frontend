import { Avatar , AvatarFallback ,AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

const Navbar = () => {
    return ( 
        <div className="bg-primary dark:bg-slate-700 text-white py-4 px-10 flex justify-between" >
            LevelUp
            <DropdownMenu>
  <DropdownMenuTrigger className="focus:outline-none">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
            </Avatar>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
   
    <DropdownMenuItem>Logout</DropdownMenuItem>
   
  </DropdownMenuContent>
</DropdownMenu>
        </div>
    );
}
 
export default Navbar;