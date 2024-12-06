import ChatBox from "@/components/chat/chatBox";
import ChatSideBar from "@/components/chat/chatSideBar";
import UserHeader from "@/components/user/userHeader";
import { cookies } from 'next/headers';

async function Chat() {
    const cookieStore = cookies();
    const authToken = (await cookieStore).get('authToken')?.value;
    return (
        <>
       {/* <UserHeader /> */}
       <div className="flex h-screen">
            
                <ChatBox chatId="" id={authToken}/>
            </div>
        </>
    )
}

export default Chat;