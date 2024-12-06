"use client"

import { accessChat } from "@/app/lib/api/chatApi";
import { useRouter } from "next/navigation";

function MessageBtn(id:any) {
        const router = useRouter();

    const handleMessage = async() => {
      const res = await accessChat(id.id);
      console.log("resss" , res);
      if(res.data.response.success) {
        router.push(`/chat/c/${res.data.response.chat.id}`)
      }
    }

    return (
        <>
         <div className="mt-3 ">
          <button onClick={handleMessage} className="flex items-center px-3 py-1 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
          {/* <MessageCircle className="w-5 h-5 mr-2" /> */}
            Message
            </button>
              </div>
        </>
    )
}

export default MessageBtn;