"use client";

import { getSessionData } from "@/app/lib/api/instructorApi";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export interface IBooking {
  id: string;
  title: string;
  price: string;              
  start: string;             
  end: string;               
  status: string;             
  scheduledSessionId: string;  
}


function InstructorChart() {
  const [events, setEvents] = useState<IBooking[]>([]);
  const [booked, setBooked] = useState<IBooking[]>([]);
  const [open, setOpen] = useState<IBooking[]>([]);

  const fetchEvents = async () => {
    const data = await getSessionData();
    setEvents(data.data.response?.events?.events || []);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      const booked: IBooking[] = [];
      const open: IBooking[] = [];

      events.forEach((ele: IBooking) => {
        if (ele.status === "booked") {
          booked.push(ele);
        } else {
          open.push(ele);
        }
      });

      setBooked(booked);
      setOpen(open);
    }
  }, [events]);

  const data = [
    { name: "Booked", value: booked.length },
    { name: "Open", value: open.length },
  ];

  const COLORS = ["#4ade80", "#60a5fa"];

  return (
    <div className="mt-6 flex justify-center">
      <ResponsiveContainer width={300} height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default InstructorChart;
