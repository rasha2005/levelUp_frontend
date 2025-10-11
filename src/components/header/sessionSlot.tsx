"use client"

import { payement } from "@/app/lib/api/userApi";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { useState } from "react";

interface IBooking {
  id: string;
  title: string;
  price: string;              
  start: string;              
  end: string;                
  status: string;             
  scheduledSessionId: string;  
}

interface IEvent {
  event: IBooking[],
  instructorId: string
}
 
function SessionSlot({ events }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const handlePayement = async(data: any) => {
    const stripe = await loadStripe("pk_test_51QNBlLHvM8RyBLKlTdnmuRb0fRXSonS9jR9Y2LSCdNvx5Ia1FMfhGJ6of1zRags6mYlsNhh3qsPq7u71HX3oWgmt00EuYxiymG");
    if (!stripe) throw new Error("Stripe could not be initialized");
    
    const body = {
      session: data,
      instructorId: events.instructorId
    };

    const headers = { "Content-Type": "application/json" };
    const response = await payement(headers, body);

    if (response.data.success) {
      window.location = response.data.data.res;
    }
  }

  const totalPages = Math.ceil(events?.event?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEvents = events?.event?.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white shadow-md rounded-lg max-w-[1200px] mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Book a Session</h3>
      </div>
      {currentEvents && currentEvents.length > 0 ? (
    <table className="table-auto w-full text-left">
      <thead>
        <tr className="text-gray-500 border-b">
          <th className="py-2 px-4">Date</th>
          <th className="py-2 px-4">Title</th>
          <th className="py-2 px-4">Available Time Slots</th>
          <th className="py-2 px-4">Status</th>
          <th className="py-2 px-4">Price</th>
          <th className="py-2 px-4">Action</th>
        </tr>
      </thead>
      <tbody>
        {currentEvents.map((event: any) => (
          <tr className="hover:bg-gray-100" key={event.id}>
            <td className="py-2 px-4">
              {new Date(event.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </td>
            <td className="py-2 px-4">{event.title}</td>
            <td className="py-2 px-4">
              {new Date(event.start).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} -{' '}
              {new Date(event.end).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
            </td>
            <td className="py-2 px-4">
            {(() => {
            const currentDate = new Date();
            const eventEnd = new Date(event.end);
            const isPast = eventEnd < currentDate;

            // Determine the display status
            const displayStatus =
              event.status === "open" && isPast ? "Ended" : event.status;

            // Determine the badge colors
            const badgeClasses =
              displayStatus === "Ended"
                ? "text-gray-500 bg-gray-100"
                : displayStatus === "open"
                ? "text-green-700 bg-green-100"
                : "text-red-700 bg-red-100";

            return (
              <span
                className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${badgeClasses}`}
              >
                {displayStatus}
              </span>
            );
          })()}


            </td>
            <td className="py-2 px-4">₹{event.price}</td>
            <td className="py-2 px-4">
            {(() => {
            if (!event?.start || !event?.end) {
              return <span className="text-gray-400 italic">Invalid event data</span>;
            }

            const currentDate = new Date();
            const eventEnd = new Date(event.end);

            const isPast = event.status === "open" && eventEnd < currentDate;

            if (event.status === "open" && !isPast) {
              return (
                <button
                  onClick={() => handlePayement(event)}
                  className="inline-block px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full hover:bg-green-200 transition"
                >
                  Book
                </button>
              );
            } else if (event.status === "open" && isPast) {
              return <span className="text-gray-500 italic">Ended</span>;
            } else {
              return <p className="text-red-400">Booked</p>;
            }
          })()}


            </td>
          </tr>
        ))}
      </tbody>
    </table>
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
          <p className="text-gray-500 text-center">No sessions available .</p>
        </div>
  )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="px-3 py-1 border rounded hover:bg-gray-200"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded hover:bg-gray-200 ${currentPage === i + 1 ? "bg-gray-800 text-white" : ""}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className="px-3 py-1 border rounded hover:bg-gray-200"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default SessionSlot;
