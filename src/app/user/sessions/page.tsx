import { getBookedSession, getStudentCourse } from "@/app/lib/api/userApi";
import SessionList from "@/components/user/sessionList";
import UserHeader from "@/components/user/userHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cookies } from 'next/headers';
import Image from "next/image";
import Link from "next/link";
import UserSidebar from "@/components/user/userSideBar";


async function Sessions() {
    const cookieStore = cookies();
    const authToken = (await cookieStore).get('authToken')?.value;
  
    const data = await getBookedSession(authToken);
    const sessions =  data.data.response.slot.slots;
    const response = await getStudentCourse(authToken);
    const course = response.data.response.data
    console.log(course)
    return (
        <>
        <UserHeader/>
        <UserSidebar/>
        <div className="max-w-6xl mx-auto mt-20 p-6 rounded-lg  bg-white">
                {/* The main Tabs component that holds the entire interface */}
                <Tabs defaultValue="myTasks"> 
                    
                    {/* COMBINED TOP ROW: This replaces your original single TabsList and includes Search/Filters */}
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                        
                        {/* LEFT SIDE: The Task Tabs (renamed from sessions/courses) */}
                        <TabsList className="h-auto p-0 bg-white">
                            {/* Note: The 'data-[state=active]' styling ensures the active tab looks like the image */}
                            <TabsTrigger 
                                value="myTasks" 
                                className="px-4 py-2 text-sm font-medium text-gray-600 data-[state=active]:text-black data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 transition-none"
                            >
                                sessions
                            </TabsTrigger>
                            <TabsTrigger 
                                value="myTeam" 
                                className="px-4 py-2 text-sm font-medium text-gray-600 data-[state=active]:text-black data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 transition-none"
                            >
                              course
                            </TabsTrigger>
                            
                        </TabsList>

                        {/* RIGHT SIDE: Search, Filters, Columns, and More Button */}
                        <div className="flex space-x-2 items-center">
                          
                    </div>
                    </div>
                    {/* CONTENT AREA: Task List Table (for the 'My Tasks' tab) */}
                    {/* The content within this tab now holds the detailed table structure */}
                    <TabsContent value="myTasks">
                        <SessionList sessions={sessions}/>
                    </TabsContent>

                    {/* Content area for My Team and All (originally 'courses') */}
                    <TabsContent value="myTeam">
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
                    
                </Tabs>
            
            </div>
        </>
    )
}

export default Sessions;