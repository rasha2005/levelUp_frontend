"use client"

import { accessChat } from "@/app/lib/api/chatApi";
import { useRouter } from "next/navigation";

function MessageBtn(id:any) {
        const router = useRouter();

    const handleMessage = async() => {
      const res = await accessChat(id.id);
      if(res.data.response.success) {
        router.push(`/chat/c/${res.data.response.chat.id}`)
      }
    }

    return (
        <>
        <button
      onClick={handleMessage}
      className="px-6 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition cursor-pointer"
    >
      Message
    </button>
        </>
    )
}

export default MessageBtn;