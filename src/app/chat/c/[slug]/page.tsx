import ChatBox from "@/components/chat/chatBox"
import UserHeader from "@/components/user/userHeader"
import { cookies } from 'next/headers';

interface ChatRoomProps {
    params: {
        slug: string;
    };
}
export default async function ChatRoom({ params }:ChatRoomProps) {
    
    const { slug } =  params;
    
   
    const cookieStore = await cookies();
    const authToken = cookieStore.get("authToken")?.value || null;
    
    return(
        <>
       
       <div className="flex h-screen">
            
                <ChatBox chatId={slug} id={authToken }/>
            </div>
        </>
        
    )
 };