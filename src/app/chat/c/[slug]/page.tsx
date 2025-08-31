import ChatBox from "@/components/chat/chatBox"
import UserHeader from "@/components/user/userHeader"
import { cookies } from 'next/headers';

interface ChatRoomProps {
    params: {
        slug: string;
    };
}

async function ChatRoom({ params }:ChatRoomProps) {
    
    const { slug } = await params;
    
   
    const cookieStore = cookies();
    const authToken = (await cookieStore).get("authToken")?.value; 
    
    
    return(
        <>
       
       <div className="flex h-screen">
            
                <ChatBox chatId={slug} id={authToken }/>
            </div>
        </>
        
    )
}
export default ChatRoom;