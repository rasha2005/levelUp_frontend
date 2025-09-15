"use client"
import dynamic from "next/dynamic";

const CallRoom = dynamic(() => import("@/components/common/callRoom"), {
  ssr: false, 
});

function RoomInstructor() {
    return (
        <>
        <CallRoom />
        </>
    )
}

export default RoomInstructor;