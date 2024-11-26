import { getBookedSession } from "@/app/lib/api/userApi";
import UserHeader from "@/components/user/userHeader";
import { cookies } from 'next/headers';

async function Sessions() {
    const cookieStore = cookies();
    const authToken = (await cookieStore).get('authToken')?.value;
    console.log("uuuuu");
    console.log("auth" , authToken);
    const data = await getBookedSession(authToken);
    const sessions =  data.data.response.slot.slots;
    return (
        <>
        <UserHeader/>
        <div className="p-6 bg-blue-50 rounded-lg shadow-md max-w-5xl mx-auto mt-20">
  {/* <h2 className="text-lg font-semibold text-gray-700 mb-4">Booked Sessions</h2> */}
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
      <thead className="bg-blue-100 text-gray-700">
        <tr>
          <th className="px-4 py-3 text-left font-semibold">No</th>
          {/* <th className="px-4 py-3 text-left font-semibold">User</th> */}
          <th className="px-4 py-3 text-left font-semibold">Session Title</th>
          <th className="px-4 py-3 text-left font-semibold">Date</th>
          <th className="px-4 py-3 text-left font-semibold">Time</th>
          <th className="px-4 py-3 text-left font-semibold">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {sessions && sessions.length > 0 ? (
            sessions.map((slot:any , index:any) => (
        <tr key={slot.id || index} className="hover:bg-blue-50 transition-colors duration-200">
          <td className="px-4 py-3 text-gray-800">{index+1}</td>
          <td className="px-4 py-3 text-gray-800">{slot.title}</td>
          <td className="px-4 py-3 text-gray-800">{new Date(slot.startTime).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}</td>
         
          <td className="px-4 py-3 text-gray-800"> {new Date(slot.startTime).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })}</td>
          <td className="px-4 py-3">
            <span className="inline-block px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">join</span>
          </td>
        </tr>
            ))
        ):(
            <p>no session are booked yet</p>
        )
        }
       
      </tbody>
    </table>
  </div>
</div>
        </>
    )
}

export default Sessions;