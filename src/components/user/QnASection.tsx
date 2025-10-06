"use client";

import { useEffect, useState } from "react";
// Assuming you have these components configured
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageSquare, CornerDownRight, X } from "lucide-react"; 
import { createQnAData, fetchAllQnADatas } from "@/app/lib/api/userApi";
import io, { Socket } from "socket.io-client";

interface QnA {
  id?:string;
  courseId:string
  userId:string;
  userName:string;
  userImg?:string | null;
  message:string;
  parentId?:string|null;
  createdAt?:Date
}

interface QnASectionProps {
  courseId: string | undefined;
  endDate:string | undefined;
  startDate:string | undefined
}


const instructorName = "Instructor";
const ENDPOINT = process.env.NEXT_PUBLIC_BASE_URL_BACKEND as string;
let socket: Socket;
export default function QnASection({courseId ,endDate , startDate }:QnASectionProps) {
  const [qnas, setQnas] = useState<QnA[]>([]);
  const [message, setMessage] = useState("");
  const [replyTo, setReplyTo] = useState<QnA | null>(null);

  const now = new Date();
  const canPost =
    startDate && endDate
      ? now >= new Date(startDate) && now <= new Date(endDate)
      : false;

  const handleSend = async() => {
    if (!message.trim()) return;
 
    const data = await createQnAData(message , replyTo?.id , courseId)
    if(data.data.response.success){
      const newQna = data.data.response.data;

      setQnas((prev) => [...prev, newQna]);
      socket.emit("new qna", newQna);
    }
    setMessage("");
    setReplyTo(null);
  };

  const cancelReply = () => setReplyTo(null);

  const fetchQnAData = async() => {
    const data = await fetchAllQnADatas(courseId);
    if(data.data.response.success){
      setQnas(data.data.response.data);
    }
  }
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("join qna", courseId);

    socket.on("qna received", (newQna: QnA) => {
      setQnas((prev) => [...prev, newQna]);
    });

    return () => {
      socket.disconnect();
    };
  }, [courseId]);

  useEffect(() => {
    fetchQnAData()
  },[])
  
  return (
    <Card className="bg-white rounded-xl mt-16 border-2 border-gray-200"> 
      <CardHeader className="py-6 px-7 border-b border-gray-200 bg-gray-50 rounded-t-xl">
        <h2 className="text-3xl font-sans font-bold text-[#1F1F1F] flex items-center tracking-tight">
          <MessageSquare className="w-6 h-6 mr-3 text-indigo-500" />
          Course Q&A Discussion Forum
        </h2>
      </CardHeader>
      
      <CardContent className="space-y-8 p-7">
        {/* Discussion Threads - SCROLLABLE AREA */}
        <div className="space-y-7 max-h-96 overflow-y-auto pr-3">
        <div className="space-y-7 max-h-96 overflow-y-auto pr-3">
  {qnas.length === 0 ? (
    <div className="flex flex-col items-center justify-center text-center py-16">
      <img
        src="/images/empty.png" 
        alt="No discussions yet"
        className="w-40 h-40 mb-6 opacity-80"
      />
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        No conversations started yet
      </h3>
      <p className="text-gray-500 max-w-md">
        Be the first to start a discussion! Ask a question or share your thoughts with the fellow learners.
      </p>
    </div>
  ) : (
    qnas
      .filter((q) => !q.parentId)
      .map((q) => (
        <div key={q.id} className="relative">
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 transition-colors hover:bg-gray-100">
            <div className="flex items-start justify-between mb-2">
            <div className="flex items-center text-lg font-extrabold text-gray-900">
              <img
                src={q.userImg || "/images/defaultProfile.jpg"} 
                alt={q.userName}
                className="w-10 h-10 rounded-full mr-3 border-2 border-gray-200 object-cover"
              />

              <div className="flex items-center">
                <span>{q.userName}</span>
                {q.userName === instructorName && (
                  <span className="ml-3 px-3 py-1 text-xs font-bold bg-indigo-600 text-white rounded-full tracking-wide uppercase">
                    Instructor
                  </span>
                )}
              </div>
            </div>
            </div>
            <p className="text-gray-800 leading-relaxed break-words mt-2">{q.message}</p>
            <div className="mt-4 flex justify-end">
              <Button
                onClick={() => setReplyTo(q)}
                size="sm"
                variant="link"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 p-0 h-auto"
              >
                <CornerDownRight className="w-4 h-4 mr-1.5" />
                Reply to Question
              </Button>
            </div>
          </div>

          {/* Replies */}
          <div className="pl-10 mt-4 space-y-4 relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-indigo-300"></div>

            {qnas
              .filter((r) => r.parentId === q.id)
              .map((r) => (
                <div
                  key={r.id}
                  className="bg-white p-4 rounded-lg border border-gray-300 relative transition-all hover:bg-gray-50"
                >
                  <div className="flex items-center mb-1">
                    <p className="font-bold text-gray-900 text-sm">{r.userName}</p>
                    {r.userName === instructorName && (
                      <span className="ml-2 px-2.5 py-0.5 text-xs font-bold bg-indigo-600 text-white rounded-full">
                        Instructor
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 leading-relaxed break-words">{r.message}</p>
                </div>
              ))}
          </div>
        </div>
      ))
  )}
</div>

        </div>

        {/* --- */}

        {/* Input Box - Replying and Asking */}
        <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
        {canPost ? (
    <>
      {replyTo && (
        <div className="text-sm text-gray-700 bg-indigo-50 p-3 rounded-lg flex items-center justify-between border-l-4 border-indigo-600">
          <span className="truncate font-medium">
            Replying to **{replyTo.userName}**: "{replyTo.message.substring(0, 50)}..."
          </span>
          <Button
            onClick={cancelReply}
            variant="ghost"
            size="icon"
            className="w-8 h-8 ml-3 text-indigo-600 hover:text-red-600"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      )}

      <Textarea
        placeholder={
          replyTo
            ? "Write your detailed reply here..."
            : "Ask a new question to the course instructor or community..."
        }
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 min-h-[120px] text-base rounded-lg"
      />
      <Button
        onClick={handleSend}
        disabled={!message.trim()}
        className="bg-indigo-600 text-white hover:bg-indigo-700 transition-colors w-full sm:w-56 font-bold tracking-wide py-3 rounded-lg"
      >
        {replyTo ? "Send Reply" : "Post Question"}
      </Button>
    </>
  ) : (
    <div className="text-center bg-gray-50 p-6 rounded-lg border border-gray-200">
      <p className="text-gray-700 text-lg font-medium">
        💬 Q&A discussions are only available between the course dates.
      </p>
      <p className="text-gray-500 text-sm mt-2">
        Start: {new Date(startDate!).toLocaleDateString()} | End:{" "}
        {new Date(endDate!).toLocaleDateString()}
      </p>
    </div>
  )}
        </div>
      </CardContent>
    </Card>
  );
}