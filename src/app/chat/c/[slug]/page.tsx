import ChatBox from "@/components/chat/chatBox"
import { cookies } from "next/headers"

interface ChatRoomProps {
  params: {
    slug: string
  }
}

export default function ChatRoom({ params }: ChatRoomProps) {
  const { slug } = params
  const cookieStore:any = cookies()
  const authToken = cookieStore.get("authToken") ?? null

  return (
    <div className="flex h-screen">
      <ChatBox chatId={slug} id={authToken} />
    </div>
  )
}
