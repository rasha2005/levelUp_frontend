"use client"

import { getSessionData } from "@/app/lib/api/instructorApi";
import { useEffect, useState } from "react"
import { BarChart, Bar, ResponsiveContainer, LabelList, XAxis, YAxis, Tooltip } from 'recharts';


function InstructorBar() {

    const [events , setEvents] = useState<any>([]);
    const [booked , setBooked] = useState<any>([]);
    const [open , setOpen] = useState<any>([]);

    const fetchEvents = async() => {
         const data = await getSessionData();
         console.log("dd" , data.data.response.events.events)
         setEvents(data.data.response.events.events);
    }

    useEffect(() => {
        fetchEvents();
    },[])

    useEffect(() => {
        console.log("enn" , events)
        if(events.length > 0) {
            const booked:any = [];
            const open:any = [];

            events.forEach((ele: any) => {
                if (ele.status === 'booked') {
                    booked.push(ele);
                } else {
                    open.push(ele);
                }
            });

            setBooked(booked);
            setOpen(open);
        }
    },[events]);

    const data = [
        {name:"booked" , value:booked.length},
        {name:"open" , value:open.length}
    ]
    return (
        <>
 <div className="mt-6">
        <ResponsiveContainer width={300} height={300}>
        <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#A6AEBF">
                    {/* Add value labels on top */}
                    <LabelList dataKey="value" position="top" />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
        </>
    )
}

export default InstructorBar;
