import Navbar from "@/components/instructor/Navbar";
import Sidebar from "@/components/instructor/Sidebar";
import CalenderEvent from "@/components/instructor/calender";
// import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'

function ScheduleSession() {
    return (
        <div className="h-screen ">
        <div className="w-full">
            <Navbar />
        </div>
        <div className="flex">
            <div className="w-[250px]">
                <Sidebar />
            </div>

            <div className="flex-1 p-10">
                {/* schedule Session */}
               <CalenderEvent />
                </div>
                </div>
                </div>
    )
}
export default ScheduleSession;