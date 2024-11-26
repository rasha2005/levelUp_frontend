"use client";

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
} from "@/components/ui/command";
import { LayoutDashboard, Users, GraduationCap, Boxes } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils"; 
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname(); // Get the current path

  return (
    <Command className="w-[250px] rounded-none">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Management">
          <CommandItem
            className={cn(
              pathname === "/admin" && "bg-blue-500 text-white"
            )}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <Link href="/admin"> Dashboard</Link>
          </CommandItem>
          <CommandItem
            className={cn(
              pathname === "/admin/user" && "bg-blue-500 text-white"
            )}
          >
            <Users className="mr-2 h-4 w-4" />
            <Link href="/admin/user"> User Management</Link>
          </CommandItem>
          <CommandItem
            className={cn(
              pathname === "/admin/instructor" &&
                "bg-blue-500 text-white"
            )}
          >
            <GraduationCap className="mr-2 h-4 w-4" />
            <Link href="/admin/instructor">Instructor Management</Link>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Other">
          <CommandItem
            className={cn(
              pathname === "/admin/category" &&
                "bg-blue-500 text-white"
            )}
          >
            <Boxes className="mr-2 h-4 w-4" />
            <Link href="/admin/category">Category</Link>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default Sidebar;
