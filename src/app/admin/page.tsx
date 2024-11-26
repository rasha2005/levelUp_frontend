import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/admin/Sidebar";

const AdminHome = () => {
    return ( 
    <>
      <div className="h-screen ">
            <div className="w-full">
                <Navbar />
            </div>
            <div className="flex">
                <div className="w-[250px]">
                    <Sidebar />
                </div>
                <div className="flex-1 p-10">
                    <h1>This is the admin Dashboard</h1> {/* Main content */}
                </div>
            </div>
        </div>
    </> 
    );
}
 
export default AdminHome;