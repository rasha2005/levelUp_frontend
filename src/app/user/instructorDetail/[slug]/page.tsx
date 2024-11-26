
import { getInstructorById } from "@/app/lib/api/userApi";
import SessionSlot from "@/components/header/sessionSlot";
import UserHeader from "@/components/user/userHeader";
// import Link from "next/navigation";
// impot {Link}


async function InstructorDetail({params}:any) {
    
    const {slug} = params
    console.log("if" , slug);
    const data = await getInstructorById(slug);
    console.log("data" , data.data);
    const instructor =  data.data.response.instructor;
   const events =  data.data.response.instructor.scheduledSession?.events;
   console.log("events" , events);
   
const event = {
  event:events,
  instructorId:instructor.id
}
 

return (
<>
<UserHeader/>

<div className="bg-gray-50 min-h-screen p-6">
        {/* Top Profile Section */}
        <div className="bg-white shadow-md rounded-lg max-w-[1200px] mx-auto p-6 mb-6">
          <div className="flex items-center space-x-4">
            <img
              src={instructor.img}
              alt="Coach Profile"
              className="rounded-full w-24 h-24"
            />
            <div>
              <h2 className="text-xl font-bold">{instructor.name}</h2>
              <p className="text-gray-500">{instructor.category} Coach</p>
              <p className="text-gray-500">{instructor.description} </p>
              <div className="flex space-x-3 mt-2">
                <a href="#" className="text-gray-400 hover:text-black">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-black">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-black">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Table Section */}
       {/* <SessionSlot id={instructor.id} /> */}
      <SessionSlot events={event} />
      
      </div>
      </>
)
}

export default InstructorDetail;