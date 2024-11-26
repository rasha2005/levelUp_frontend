import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/admin/Sidebar";
import SlotList from "@/components/common/slotList";

function Slots() {
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

export default Slots;