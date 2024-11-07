"use client"
import { usePathname } from "next/navigation";
import Navbar from "../components/admin/Navbar";
import Sidebar from "../components/admin/Sidebar";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  console.log("Current path:", path);
  
  const isLoginPath = path === "/admin/login";
  console.log(isLoginPath)
  
  return (
    <div>
      {!isLoginPath && <Navbar />}
      <div className="flex">
        <div className={`hidden md:block h-[100vh]`}>
          {!isLoginPath && <Sidebar />}
        </div>
        <div className="p-5 w-full md:max-w-[1140px]">
          {children}
        </div>
      </div>
    </div>
  );
}
