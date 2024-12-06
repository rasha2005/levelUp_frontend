"use client"

import { createMessage, fetchChats, fetchMessages } from "@/app/lib/api/chatApi";
import { useEffect, useState } from "react";
import { Socket, io } from 'socket.io-client'
import { jwtDecode } from 'jwt-decode';
import Link from "next/link";


const ENDPOINT = process.env.NEXT_PUBLIC_BASE_URL_BACKEND as string;
let socket: Socket;
let selectedChatCompare: any;


function ChatBox({ chatId , id}:any) {
    console.log("ddd" , chatId);
    const userData = jwtDecode<{email :string ; role:string}>(id);
    console.log("id" , userData)
   
    const [isChatId , setIsChatId] = useState(false);
    const [chats , setChats] = useState([]);
    const [newMessage , setNewMessage] = useState("");
    const [message , setMessage] = useState<any>([]);
    const [user , setUser] = useState("");
    const [chatRoom , setChatRoom] = useState<any>({})
    const [socketConnected , setSocketConnected] = useState(false)
    
    

    const handleSumbit = async() => {
        const res = await createMessage(newMessage , chatId)
        if(res.data.response.success) {
          socket.emit('new message' , res.data.response.res)
          setMessage([...message , res.data.response.res])
        }
        setNewMessage("");
    }

    useEffect(() => {
      socket = io(ENDPOINT);
      console.log("why",userData)
      socket.emit("setup" , userData);
      socket.on("connection" , () => setSocketConnected(true))
    },[])

    const intialFetch = async() => {
        const res = await fetchChats();
        console.log("re" , res);
        if(res.data.response.success) {
            setChats(res.data.response.chats)
            setUser(res.data.response.user)
        }
    }
    useEffect(() => {
        
        intialFetch()

    },[])

    useEffect(() => {
      socket.on('message recived' , (newMessageRecived) => {
        if(!selectedChatCompare || selectedChatCompare !==  newMessageRecived.chat.id){
          //something
        }else{
          setMessage([...message , newMessageRecived])
        }
      })
    })

  

    useEffect(() => {
        if (chatId) {
            setIsChatId(true)
            const fetchChatMessages = async () => {
                const res = await fetchMessages(chatId);
                console.log("hehe" , res)
                if(res.data.response.success) {
                  setMessage(res.data.response.data)
                  setChatRoom(res.data.response.chat)
                }
                socket.emit('join chat' , chatId)
            };

            fetchChatMessages();
            selectedChatCompare = chatId
        }
    }, [chatId]);  

   
   
    return (
        <>
      <div className="flex">
    {/* Navbar */}
    <div className="w-16 bg-blue-600 h-screen flex flex-col items-center py-4 space-y-6">
        {/* Home Icon */}
        <button
        
            // onClick={() => window.location.href = '/user/home'}
            className="p-3 bg-blue-900 rounded-full text-white hover:bg-blue-700"
            aria-label="Go to Home"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l9-9m0 0l9 9m-9-9v18"
                />
            </svg>
        </button>
       
        {/* Add More Icons */}
    </div>

    {/* Content Section */}
    <div className="w-1/1 bg-gray-200 p-4">
        <input
            type="text"
            placeholder="Search chats..."
            className="w-full p-2 rounded mb-4"
        />
        <div className="space-y-2">
            {/* Mapping over filtered chats */}
            {chats.map((chat: any) => (
              <div key={chat.id}  className={` p-2  w-full rounded ${
                chat.id === chatId ? "bg-gray-300 " : "bg-gray-200 "
              }`} >
                  <Link href={`/chat/c/${chat.id}`} >
                    <div className="flex items-center space-x-4">

                    <img
                        src={chat?.instructor?.img || chat?.user?.img}
                        alt="Coach Profile"
                        className="rounded-full w-10 h-10"
                        />
                    <div>
                        <h2 className="text-xl font-bold">{chat?.instructor?.name || chat?.user?.name}</h2>
                    </div>
                        </div>
                </Link>
                </div>
            ))}
        </div>
    </div>
</div>
<div className="flex-1 flex flex-col">
  {/* Chat Box Header */}
  {
    chatId ? (
<header className="flex justify-between items-center p-4 bg-gray-100 w-full">
    <div className="flex justify-between items-center">
      {
      chatRoom?.userId === user ?(
        <div className="p-3 ml-2 flex items-center space-x-3">
<img
      src={chatRoom?.instructor?.img}
      alt="User"
      className="rounded-full w-8 h-8"
    />
<h2 className="text-xl font-semibold">{chatRoom?.instructor?.name}</h2>
</div>
        ):(
          <div className="p-3 ml-2 flex items-center space-x-3">
  <img
    src={chatRoom?.user?.img}
    alt="User"
    className="rounded-full w-8 h-8"
  />
  <h2 className="text-xl font-semibold mr-2">{chatRoom?.user?.name}</h2>
</div>
        )
      }
      {/* Uncomment if needed: */}
      {/* <button className="text-sm text-blue-500 hover:text-blue-700">Leave Chat</button> */}
    </div>
  </header>

    ):(
      <></>
    )
  }
  
  {/* Conditional Rendering for Chat ID */}
  {isChatId ? (
    <>
      {/* Chat Messages (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 bg-white">
        {/* Chat messages and content */}
        <div className="space-y-4">
          {/* Example chat messages */}
            {
              message.map((m:any , i:any) => (
                
          <div key={i} className={`flex items-center space-x-4 ${
            m.senderId === user ? "justify-end" : ""
          }`}>
            {m.senderId !== user && (
              
               
                <img
                  src={chatRoom?.userId === user ? chatRoom?.instructor?.img : chatRoom?.user?.img}
                  alt="User"
                  className="rounded-full w-7 h-7"
                />
              
  )}
            <div >
              <p  className={`font-semibold px-4 py-2 rounded-lg shadow-sm ${
        m.senderId === user 
          ? "bg-green-100 text-green-900"  // Background for the user
          : "bg-blue-100 text-blue-900"   // Background for others
      }`}>{m.content}</p>
              {/* <p className="text-sm">Hello! How are you?</p> */}
            </div>
          </div>
              ))
            }
          {/* Add more chat messages as needed */}
        </div>
      </div>

      {/* Message Input (Fixed at the bottom) */}
      <div className="p-4 bg-gray-100">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            placeholder="Type a message..."
            className="w-full p-2 rounded bg-white border border-gray-300"
          />
          <button onClick={handleSumbit} className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
            Send
          </button>
        </div>
      </div>
    </>
  ) : (
    <p className="p-4 text-gray-500">Start a new message</p>
  )}
</div>
        </>
    )
}

export default ChatBox;