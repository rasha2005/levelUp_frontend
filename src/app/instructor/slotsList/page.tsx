import Navbar from "@/components/instructor/Navbar";
import SlotList from "@/components/common/slotList";
import Sidebar from "@/components/instructor/Sidebar";


function SlotsList() {
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
                <SlotList/>
                </div>
                </div>
        </>
    )
}
export default SlotsList;