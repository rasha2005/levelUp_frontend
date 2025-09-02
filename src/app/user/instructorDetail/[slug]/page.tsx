
import { getInstructorById } from "@/app/lib/api/userApi";
import SessionSlot from "@/components/header/sessionSlot";
import UserHeader from "@/components/user/userHeader";
import { FaStar } from "react-icons/fa";
import MessageBtn from "@/components/chat/button";
import ReviewBtn from "@/components/user/reviewBtn";
import ReviewCarousel from "@/components/user/carousel";
import { cookies } from 'next/headers';



async function InstructorDetail({params}:any) {
    const {slug} = params
    const cookieStore = cookies();
    const authToken = (await cookieStore).get('authToken')?.value;
    const data = await getInstructorById(slug , authToken);
    const instructor =  data.data.response.instructor;
    const review = data.data.response.review;
    const isReview = data.data.response.isReview;
   const events =  data.data.response.instructor.scheduledSession?.events;
   
const event = {
  event:events,
  instructorId:instructor.id
}

 

return (
  <>
    <UserHeader />

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
            <p className="text-gray-500">{instructor.description}</p>
            <div className="flex">
              {[...Array(5)].map((_, index) => {
                const currentRate = index + 1;

                return (
                  <label key={currentRate}>
                    <FaStar
                      size={13}
                      color={
                        currentRate <= Math.ceil(instructor.rating / 10)
                          ? "yellow"
                          : "gray"
                      }
                    />
                  </label>
                );
              })}
            </div>
            <div className="flex space-x-4">
              <MessageBtn id={instructor.id} />
             
              {
                isReview ? <></>:<ReviewBtn id={instructor.id} />
              }
            </div>

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
      <div className="text-center mb-6 mt-10">

      <h2 className="text-2xl font-semibold">What People Are Saying</h2>
      </div>
      {/* Card Section */}

      <ReviewCarousel review={review}/>
    </div>
  </>
);
    }

export default InstructorDetail;