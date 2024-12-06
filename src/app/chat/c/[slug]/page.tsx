import ChatBox from "@/components/chat/chatBox"
import UserHeader from "@/components/user/userHeader"
import { cookies } from 'next/headers';

async function ChatRoom({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    console.log("sla" , slug);
    const cookieStore = cookies();
    const authToken = (await cookieStore).get('authToken')?.value;
    console.log("aith" , authToken)
    
    return(
        <>
        {/* <UserHeader /> */}
       <div className="flex h-screen">
            
                <ChatBox chatId={slug} id={authToken}/>
            </div>
        </>
        
    )
}
export default ChatRoom;