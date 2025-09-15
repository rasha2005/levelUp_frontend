"use client"

import {ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import { getRoomStatus, verifyRoomId } from "@/app/lib/api/userApi";
import { markInstructorJoined, verifyInstructorRoomId } from "@/app/lib/api/instructorApi";

interface JwtPayload {
    id: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
  }

function CallRoom() {
    const [isVerified , setIsVerified] = useState(false);
    const [instructorJoined,setInstructorJoined] = useState<boolean>(false);
    const params = useParams();
    let {slug} = params

    const cookies = document.cookie;
    const authToken = cookies.split('; ').find(row => row.startsWith('authToken='));

    
      const token = authToken?.split('=')[1] || ""; 
     const decodedToken = jwtDecode<JwtPayload>(token); 
      
   
    const containerRef = useRef(null);

    const verifyId = async () => {
        if (decodedToken?.role === "User") {
            const res = await verifyRoomId(params.slug, decodedToken.id);
            setIsVerified(res.data.response.success);
        }else if(decodedToken?.role === "Instructor") {
            const res = await verifyInstructorRoomId(params.slug , decodedToken.id) 
            setIsVerified(res.data.response.success);
        }
    };

    // Initialize the meeting
    const myMeeting = async (ele: HTMLElement) => {
        const appID = Number(process.env.NEXT_PUBLIC_APP_ID);
        const serverSecret =process.env.NEXT_PUBLIC_SERVER_SECRET;
        if (!serverSecret) {
            throw new Error("Invalid or missing SERVER_SECRET in environment variables");
        }
        if(!slug) {
            throw new Error("Invalid or missing SERVER_SECRET in environment variables");
        }

        
       

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            slug.toString(),
            decodedToken.id,
            decodedToken.email
        );

        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container: ele,
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            onJoinRoom : async () => {
                if(decodedToken.role === "Instructor") {
                    await markInstructorJoined(params.slug);
                }
            }
        });
    };
    const waitForInstructor = async () => {
        const poll = setInterval(async () => {
          const res = await getRoomStatus(params.slug);
          console.log("rs",res);
          if (res.data.response.data) {
            setInstructorJoined(true);
            clearInterval(poll);
          }
        }, 5000); // every 2 sec
      };
      useEffect(() => {
        const initializeMeeting = async () => {
            await verifyId();
            if (decodedToken.role === "User") {
                await waitForInstructor(); 
              } else {
                setInstructorJoined(true); 
              }
            

            if (isVerified && containerRef.current) {
                await myMeeting(containerRef.current);
            }
        };

        initializeMeeting();
      },[params.slug])

    useEffect(() => {
        if (isVerified && instructorJoined && containerRef.current) {
            myMeeting(containerRef.current);
          }
        }, [isVerified, instructorJoined]);

    return (
        <div className="w-[1315px] h-[650px] bg-gray-100">
        {!instructorJoined && decodedToken.role === "User" ? (
          <div className="flex h-full items-center justify-center text-xl">
            Waiting for instructor to join…
          </div>
        ) : (
          <div ref={containerRef} className="w-full h-full" />
        )}
      </div>
    );
    
}

export default CallRoom;