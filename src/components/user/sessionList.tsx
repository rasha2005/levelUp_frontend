"use client"
import Link from "next/link";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
  } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { updateRating } from "@/app/lib/api/userApi";
import { useRouter } from "next/navigation";
import { ArrowRight , ArrowLeft } from "lucide-react";


function SessionList({sessions}:any) {
    const [selectedSession, setSelectedSession] = useState<any>(null);
    const [rating, setRating] = useState<number | null>(null);
    const [hover, setHover] = useState<number | null>(null); 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const router = useRouter()

    const totalPages = Math.ceil(sessions.length / itemsPerPage);

     
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentSessions = sessions.slice(startIndex, startIndex + itemsPerPage);

    const handleOpenDialog = (session: any) => {
        setSelectedSession(session);
      };

     

      const handleRateSubmit = async(id:any) => {
       const res = await updateRating(rating , id);
       if(res.data.response.success){
        router.refresh()
       }
      };

      const handleNextPage = () => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      };
    
      const handlePreviousPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };
    return (
      <>
      {currentSessions && currentSessions.length > 0 ? (
        <>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">No</th>
                <th className="px-4 py-3 text-left font-semibold">Session Title</th>
                <th className="px-4 py-3 text-left font-semibold">Date</th>
                <th className="px-4 py-3 text-left font-semibold">Time</th>
                <th className="px-4 py-3 text-left font-semibold">Action</th>
                <th className="px-4 py-3 text-left font-semibold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentSessions.map((slot: any, index: any) => (
                <tr
                  key={slot.id || index}
                  className="hover:bg-blue-50 transition-colors duration-200"
                >
                  <td className="px-4 py-3 text-gray-800">{startIndex + index + 1}</td>
                  <td className="px-4 py-3 text-gray-800">{slot.title}</td>
                  <td className="px-4 py-3 text-gray-800">
                    {new Date(slot.startTime).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3 text-gray-800">
                    {new Date(slot.startTime).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(slot.endTime) > new Date() ? (
                      <Link href={`/user/room/${slot.roomId}`}>
                        <span className="inline-block px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                          join
                        </span>
                      </Link>
                    ) : (
                      <span className="inline-block px-3 py-1 text-sm font-medium text-red-700 bg-red-100 rounded-full">
                        Ended
                      </span>
                    )}
                  </td>
                  {!slot.isRated ? (
                    <td>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            onClick={() => handleOpenDialog(sessions)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                          >
                            Rate the session
                          </button>
                        </AlertDialogTrigger>
                        {selectedSession === sessions && (
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Rate Session: {slot.title}
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Please rate the session from 1 to 5.
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            <label className="block mb-2 text-sm font-medium text-gray-700">
                              Your Rating:
                            </label>
                            <div className="flex">
                              {[...Array(5)].map((_, index) => {
                                const currentRate = index + 1;

                                return (
                                  <label key={currentRate}>
                                    <input
                                      type="radio"
                                      name="rate"
                                      value={currentRate}
                                      className="hidden"
                                      onClick={() => setRating(currentRate)}
                                    />
                                    <FaStar
                                      size={24}
                                      color={
                                        currentRate <= (hover ?? rating ?? 0)
                                          ? "yellow"
                                          : "gray"
                                      }
                                      className="cursor-pointer"
                                      onMouseEnter={() => setHover(currentRate)}
                                      onMouseLeave={() => setHover(null)}
                                    />
                                  </label>
                                );
                              })}
                            </div>

                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleRateSubmit(slot.id)}
                                disabled={!rating}
                              >
                                Submit
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        )}
                      </AlertDialog>
                    </td>
                  ) : (
                    <></>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              <ArrowLeft/>
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              <ArrowRight/>
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 mt-4">No sessions are booked yet.</p>
      )}
    </>
    )
}

export default SessionList;