import { getBookedSession } from "@/app/lib/api/userApi";
import SessionList from "@/components/user/sessionList";
import UserHeader from "@/components/user/userHeader";
import { cookies } from 'next/headers';


async function Sessions() {
    const cookieStore = cookies();
    const authToken = (await cookieStore).get('authToken')?.value;
  
    const data = await getBookedSession(authToken);
    const sessions =  data.data.response.slot.slots;
    return (
        <>
        <UserHeader/>
        <div className="p-6 rounded-lg shadow-md max-w-5xl mx-auto mt-20">
  {/* <h2 className="text-lg font-semibold text-gray-700 mb-4">Booked Sessions</h2> */}
  <div className="overflow-x-auto">
    <SessionList sessions={sessions}/>
  </div>
</div>
        </>
    )
}

export default Sessions;