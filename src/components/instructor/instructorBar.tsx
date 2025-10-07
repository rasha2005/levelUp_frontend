"use client";

import { getSessionData } from "@/app/lib/api/instructorApi";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// Data types remain the same
export interface IBooking {
  id: string;
  title: string;
  price: string;              
  start: string;             
  end: string;               
  status: string;             
  scheduledSessionId: string;  
}

// Custom hook to fetch data (unchanged)
function useChartData() {
  const [events, setEvents] = useState<IBooking[]>([]);
  const [booked, setBooked] = useState<IBooking[]>([]);
  const [open, setOpen] = useState<IBooking[]>([]);

  const fetchEvents = async () => {
    // Assuming getSessionData is available and works as expected
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

  const total = events.length;
  
  // Data array for Recharts
  const data = [
    // Use the image's color scheme (green/cyan for dominant slices, though we only have two)
    // Using a primary teal/cyan color and a secondary green/lime for better contrast
    { name: "Booked Sessions", value: booked.length, color: "#16a3b5" }, // Darker Teal/Cyan
    { name: "Open Slots", value: open.length, color: "#4ade80" },      // Lime Green
  ];
  
  return { data, total };
}

function InstructorChart() {
  const { data, total } = useChartData();

  // Color array uses the colors defined in the data
  const COLORS = data.map(d => d.color); 
  const totalDisplay = total > 0 ? total : 0;
  
  // Custom Tooltip component to match the look
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const entry = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-md text-sm">
          <p className="font-semibold" style={{ color: entry.color }}>{entry.name}</p>
          <p>Count: {entry.value}</p>
          <p>Percentage: {(entry.value / total * 100).toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  // Custom center text component
  const renderCenterText = () => (
    <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
      <div className="text-4xl font-bold text-gray-800">{totalDisplay}</div>
      <div className="text-sm text-gray-500">Total</div>
    </div>
  );
  
  // Custom Legend component for the layout below the chart
  const renderLegend = () => (
    <div className="mt-4 flex flex-wrap justify-center text-sm">
      {data.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center m-1 p-1">
          {/* Color box */}
          <div 
            className="w-3 h-3 rounded-full mr-2" 
            style={{ backgroundColor: entry.color }}
          ></div>
          {/* Label and Percentage. Using the value/total for percentage */}
          <span className="text-gray-700">
            <span className="font-bold">{((entry.value / total) * 100).toFixed(0)}%</span> {entry.name.replace('Sessions', '').replace('Slots', '')}
          </span>
        </div>
      ))}
    </div>
  );


  return (
    <>
      <div className="relative" style={{ width: 300, height: 300 }}>
        {/* Render the total count in the center */}
        {renderCenterText()} 

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              // Key change: innerRadius creates the donut shape
              innerRadius={80} 
              outerRadius={120}
              paddingAngle={2} // Small gap between slices for visual separation
              fill="#8884d8"
              dataKey="value"
              // Remove the default label on the chart
              labelLine={false} 
              label={false}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  // Adding a slight border/shadow to slices for definition
                  stroke="white"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            {/* Using the custom tooltip for a clean look */}
            <Tooltip content={<CustomTooltip />} /> 
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {/* Render the custom legend below the chart */}
      {renderLegend()}
   </>
  );
}

export default InstructorChart;