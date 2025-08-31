"use client"

import ChatBox from "@/components/chat/chatBox"
import Cookies from "js-cookie"

interface ChatRoomProps {
  params: {
    slug: string
  }
}

export default function ChatRoom({ params }: ChatRoomProps) {
  const { slug } = params
  
  const authToken = Cookies.get("authToken") ?? null

  return (
    <div className="flex h-screen">
      <ChatBox chatId={slug} id={authToken} />
    </div>
  )
}
