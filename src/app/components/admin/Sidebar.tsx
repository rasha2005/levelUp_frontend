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
  import { LayoutDashboard  , Users , GraduationCap , Boxes} from 'lucide-react'
  import Link from "next/link";

const  Sidebar = () => {
    return ( 
        <Command className="w-[250px] rounded-none">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Management">
            <CommandItem>
                <LayoutDashboard className="mr-2 h-4 w-4"/>
                <Link href="/admin"> Dashboard</Link>
            </CommandItem>
            <CommandItem>
                <Users className="mr-2 h-4 w-4"/>
                <Link href="/admin/user"> User Mangement</Link>
            </CommandItem>
            <CommandItem>
                <GraduationCap className="mr-2 h-4 w-4"/>
                <Link href={'/admin/instructor'}>Instructor Mangement</Link>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Other">
            <CommandItem>
                <Boxes  className="mr-2 h-4 w-4" />
                <Link href={'/admin/category'}>Category</Link> 
            </CommandItem>
            <CommandItem></CommandItem>
            <CommandItem></CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
      
     );
}
 
export default Sidebar;