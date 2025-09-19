"use client"

import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
  import { LayoutDashboard  , Users , GraduationCap , Boxes , Calendar , ListIcon , BookOpen} from 'lucide-react'
  import Link from "next/link";
  import { cn } from "@/lib/utils"; 
import { usePathname } from "next/navigation";

const  Sidebar = () => {
  const pathname = usePathname();
    return ( 
        <Command className="w-[250px] rounded-none">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Management">
            <CommandItem
            className={cn(
              pathname === "/instructor" && "bg-blue-500 text-white"
            )}
          >
                <LayoutDashboard className="mr-2 h-4 w-4"/>
                <Link href="/instructor"> Dashboard</Link>
            </CommandItem>
            <CommandItem
            className={cn(
              pathname === "/instructor/scheduleSession" && "bg-blue-500 text-white"
            )}
          >
                <Calendar className="mr-2 h-4 w-4"/>
                <Link href="/instructor/scheduleSession"> Schedule session</Link>
            </CommandItem>
        
            <CommandItem
            className={cn(
              pathname === "/instructor/slotsList" && "bg-blue-500 text-white"
            )}
          >
                <ListIcon className="mr-2 h-4 w-4"/>
                <Link href="/instructor/slotsList"> Slots</Link>
            </CommandItem>
            <CommandItem
            className={cn(
              pathname === "/instructor/questionBank" && "bg-blue-500 text-white"
            )}
          >
                <BookOpen className="mr-2 h-4 w-4"/>
                <Link href="/instructor/questionBank"> Question Bank</Link>
            </CommandItem>
          </CommandGroup>
          
          
        </CommandList>
      </Command>
      
     );
}
 
export default Sidebar;