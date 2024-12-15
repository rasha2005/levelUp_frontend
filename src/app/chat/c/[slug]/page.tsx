import ChatBox from "@/components/chat/chatBox"
import UserHeader from "@/components/user/userHeader"
import { cookies } from 'next/headers';

interface ChatRoomProps {
    params: {
        slug: string;
    };
}

async function ChatRoom({ params }:any) {
    console.log("params" , params);
    const { slug } = await params;
    console.log("sla" , slug);
   
    const cookieStore = cookies(); // cookies() doesn't need to be awaited
    const authToken = (await cookieStore).get("authToken")?.value; 
    console.log("aith" , authToken)
    
    return(
        <>
        {/* <UserHeader /> */}
       <div className="flex h-screen">
            
                <ChatBox chatId={slug} id={authToken }/>
            </div>
        </>
        
    )
}
export default ChatRoom;