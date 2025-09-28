import { getInstructorById } from "@/app/lib/api/userApi";
import SessionSlot from "@/components/header/sessionSlot";
import UserHeader from "@/components/user/userHeader";
import { FaStar } from "react-icons/fa";
import MessageBtn from "@/components/chat/button";
import ReviewBtn from "@/components/user/reviewBtn";
import ReviewCarousel from "@/components/user/carousel";
import { cookies } from 'next/headers';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Link from "next/link";
import Image from "next/image";
import UserSidebar from "@/components/user/userSideBar";
// Removed unused icons: FaUpload, FaBell, FaBookmark

// Interfaces remain the same
interface InstructorProps {
  params: {
      slug: string;
  };
}
 interface IBooking {
  id: string;
  title: string;
  price: string;              
  start: string;              
  end: string;                
  status: string;             
  scheduledSessionId: string;  
}


async function InstructorDetail({params}:any) {
    const {slug} = params
    const cookieStore = cookies();
    const authToken = (await cookieStore).get('authToken')?.value;
    const data = await getInstructorById(slug , authToken);
    const instructor =  data.data.response.instructor;
    const review = data.data.response.review;
    const isReview = data.data.response.isReview;
    const course = data.data.response.course ;
    console.log('cou',course);

    let events = data.data.response.instructor.scheduledSession?.events || [];

    events = events.sort((a: any, b: any) => {
      return new Date(b.start).getTime() - new Date(a.start).getTime();
    });
    
    const event = {
      event:events,
      instructorId:instructor.id
    }

    // Dummy stats to mimic the circular badges in the image (26, 6, 12)
    const portfolioStats = {
        shots: 26, 
        projects: 6,
        likes: 12,
    }

 

return (
  <>
    {/* Keep the original UserHeader here */}
    <UserHeader /> 

    <UserSidebar/>

    <div className="min-h-screen bg-white">
      
      {/* Background Gradient Effect (Mimics the blurred colors in the image) */}
      <div className="absolute top-0 left-0 w-full h-[350px] opacity-40 -z-0 pointer-events-none">
        <div className="w-1/2 h-full bg-gradient-to-br from-indigo-200 to-pink-200 opacity-30 blur-3xl absolute top-0 left-0 rounded-full"></div>
        <div className="w-1/3 h-full bg-gradient-to-bl from-purple-200 to-blue-200 opacity-30 blur-3xl absolute top-0 right-0 rounded-full"></div>
      </div>

      {/* Main Profile Container */}
      {/* Use a maximum width container for the content */}
      <div className="relative max-w-6xl mx-auto pt-8 px-4 z-10">
        
        {/* Profile Details Section */}
        <div className="flex items-start justify-between">
          
          {/* Left: Profile Image */}
          <div className="w-40 h-40 mr-8 flex-shrink-0 mt-8">
            <img
              src={instructor.img || "/images/defaultProfile.jpg"}
              alt={`${instructor.name}'s Profile`}
              className="w-full h-full object-cover rounded-[30px] shadow-2xl"
            />
          </div>

          {/* Center: Name and Description */}
          <div className="flex-grow pt-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              {instructor.name}
            </h2>
            <p className="text-lg text-gray-600 mt-1">
              {/* Combining category, role, and location */}
              {instructor.description }
            </p>
            {instructor.specializations?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {instructor.specializations.map((spec: string, idx: number) => (
                  <span
                    key={idx}
                    className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-4 flex space-x-1">
              {[...Array(5)].map((_, index) => {
                const currentRate = index + 1;
                return (
                  <FaStar
                    key={currentRate}
                    size={20}
                    color={currentRate <= Math.ceil(instructor.rating / 10) ? "yellow" : "gray"}
                  />
                );
              })}
            </div>
            {/* Action Buttons */}
           <div className="mt-6 flex space-x-2">
  <MessageBtn id={instructor.id} />
  {!isReview && (events?.event?.length > 0 || course?.length > 0) && (
  <ReviewBtn id={instructor.id} />
)}

</div>

              
           
          </div>
          
          {/* Right: Circular Stats/Counts (26, 6, 12) */}
        
          </div>
        </div>

        {/* Followers/Following/Likes Line */}
    

      {/* --- */}

      {/* Tabs / Content Area */}
      <Tabs defaultValue="sessions" className="max-w-6xl mx-auto mt-16">
  {/* Tabs Triggers */}
  <TabsList>
    <TabsTrigger value="sessions">
      Sessions <span className="ml-1 text-xs text-gray-500">{event?.event?.length}</span>
    </TabsTrigger>
    <TabsTrigger value="courses">
      Courses <span className="ml-1 text-xs text-gray-500">{course?.length}</span>
    </TabsTrigger>
    <TabsTrigger value="reviews">
      Reviews <span className="ml-1 text-xs text-gray-500">{review?.length}</span>
    </TabsTrigger>
  </TabsList>

  {/* Sessions Content */}
  <TabsContent value="sessions" className="pb-16">
    <h3 className="text-2xl font-semibold mb-6">Upcoming Sessions</h3>
    <SessionSlot events={event} />
  </TabsContent>

  {/* Courses Content */}
  <TabsContent value="courses" className="pb-16">
    <h3 className="text-2xl font-semibold mb-6">Latest Courses</h3>
    {course?.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {course.map((c: any) => (
          <div
            key={c.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition p-4 border border-gray-100"
          >
            <div className="w-full h-32 mb-3">
              <img
                src={c.thumbnail || "/images/default-thumbnail.png"}
                alt={c.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h2 className="text-md font-bold mb-1 truncate">{c.name}</h2>
            <p className="text-sm text-gray-500 mb-3">{c.sessionCount} Sessions</p>
            <div className="flex justify-between items-center mt-auto">
              <p className="text-sm font-semibold">
                {c.isFreeTrial ? <span className="text-green-600">Free Trial</span> : `₹${c.price}`}
              </p>
              <Link
                className="px-3 py-1 bg-gray-800 text-white text-xs rounded-md hover:bg-gray-700 text-center"
                href={`/user/courseDetails/${c.id}`}
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center mt-10">
      <div className="relative w-48 h-48 mb-4">
       <Image
          src="/images/empty.png"
          alt="No instructors found"
          width={192} 
          height={192} 
          className="mb-6"
                     />
      </div>
      <p className="text-gray-500 text-center">No courses available in this section.</p>
    </div>
    )}
  </TabsContent>

  {/* Reviews Content */}
  <TabsContent value="reviews" className="pb-16">
    <h3 className="text-2xl font-semibold mb-6 text-center">What People Are Saying</h3>
    <ReviewCarousel review={review} />
  </TabsContent>
</Tabs>

    </div>
  </>
);
}

export default InstructorDetail;