"use client"

import {ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import { verifyRoomId } from "@/app/lib/api/userApi";
import { verifyInstructorRoomId } from "@/app/lib/api/instructorApi";

interface JwtPayload {
    id: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
  }

function CallRoom() {
    const [isVerified , setIsVerified] = useState(false);
    const params = useParams();
    let {slug} = params

    const cookies = document.cookie;
    console.log("cookies" , cookies);
    const authToken = cookies.split('; ').find(row => row.startsWith('authToken='));

    
      const token = authToken?.split('=')[1] || ""; // Extract the token value
     const decodedToken = jwtDecode<JwtPayload>(token); // Decode the JWT token
      
   
    console.log("userId" , decodedToken);
    const containerRef = useRef(null);

    // Verify the room ID
    const verifyId = async () => {
        if (decodedToken?.role === "User") {
            const res = await verifyRoomId(params.slug, decodedToken.id);
            setIsVerified(res.data.response.success);
        }else if(decodedToken?.role === "Instructor") {
            console.log("decodedToken" , decodedToken.id);
            const res = await verifyInstructorRoomId(params.slug , decodedToken.id) 
            console.log("ress" , res);
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
        });
    };

    useEffect(() => {
        // Verify and initialize meeting when conditions are met
        const initializeMeeting = async () => {
            await verifyId();

            if (isVerified && containerRef.current) {
                await myMeeting(containerRef.current);
            }
        };

        initializeMeeting();
    }, [params.slug, isVerified]);

    return (
        <div ref={containerRef} />
    )
}

export default CallRoom;