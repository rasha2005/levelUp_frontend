"use client"

import { payement } from "@/app/lib/api/userApi";
import {loadStripe} from "@stripe/stripe-js"
 
function SessionSlot({events}:any) {
  console.log("llll" ,events);
    // console.log("yt" , id);
    const handlePayement = async(data:any) => {
      console.log("payement" , data);
console.log("process.env.STRIPE_PUBLISHABLE_KEY")
     // Load the Stripe instance
    const stripe = await loadStripe("pk_test_51QNBlLHvM8RyBLKlTdnmuRb0fRXSonS9jR9Y2LSCdNvx5Ia1FMfhGJ6of1zRags6mYlsNhh3qsPq7u71HX3oWgmt00EuYxiymG");
    if (!stripe) {
      throw new Error("Stripe could not be initialized");
    }

    
    // Prepare the request payload
    const body = {
      session: data,
      instructorId:events.instructorId
     
       // Ensure `events` is defined correctly
    };

    // Set headers
    const headers = {
      "Content-Type": "application/json",
    };

    // Call the payment endpoint
    const response = await payement(headers, body);
    console.log("Redirecting to:", response);

    // Handle the response
    if (response.data.success) {
      console.log("Redirecting to:", response.data);
      window.location = response.data.data;
    }
    // const session = response.data; // Axios already parses JSON
    // const result = await stripe.redirectToCheckout({
    //   sessionId: session.id,
    // });

    // if (result.error) {
    //   console.error("Stripe Checkout Error:", result.error.message);
    // }
  
     }
    return (
        <>
 <div className="bg-white shadow-md rounded-lg max-w-[1200px] mx-auto p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Book a Session</h3>
            <button className="text-sm text-blue-600 hover:underline">
              {/* Next 5 days → */}
            </button>
          </div>
          <table className="table-auto w-full text-left">
  <thead>
    <tr className="text-gray-500 border-b">
      <th className="py-2 px-4">Date</th>
      <th className="py-2 px-4">title</th>
      <th className="py-2 px-4">Available Time Slots</th>
      <th className="py-2 px-4">Status</th>
      <th className="py-2 px-4">Price</th>
      <th className="py-2 px-4">Action</th>
    </tr>
  </thead>
  <tbody>
    {events && events?.event?.length > 0 ? (
      events.event.map((event:any) => (
        <tr className="hover:bg-gray-100" key={event.id}>
          <td className="py-2 px-4">
            {new Date(event.start).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </td>
          <td className="py-2 px-4">{event.title}</td>
          <td className="py-2 px-4">
            {new Date(event.start).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })} -{' '}
            {new Date(event.end).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })}
          </td>
          <td className="py-2 px-4">
  <span
    className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
      event.status === "open"
        ? "text-green-700 bg-green-100"
        : "text-red-700 bg-red-100"
    }`}
  >
    {event.status}
  </span>
</td>
          <td className="py-2 px-4">₹{event.price}</td>
          <td className="py-2 px-4">
            {event.status === 'open' ? (
              <button onClick={() => handlePayement(event)} className="inline-block px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                Book
              </button>
            ) : (
              <p className="text-red-400">Booked</p>
            )}
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td className="py-2 px-4 text-center" >
          No sessions yet
        </td>
      </tr>
    )}
  </tbody>
</table>
        </div>
      
        </>
    )
}
export default SessionSlot;