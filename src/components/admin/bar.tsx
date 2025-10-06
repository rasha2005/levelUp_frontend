"use client"

import { useEffect, useState } from "react";
import { BarChart, Bar, ResponsiveContainer, LabelList, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { fetchMonthlyRevenue } from "@/app/lib/api/adminApi"; // new API call

interface MonthlyRevenue {
  month: string;
  amount: number;
}

function RevenueBarChart() {
  const [monthlyRevenue, setMonthlyRevenue] = useState<MonthlyRevenue[]>([]);

  const fetchRevenue = async () => {
    try {
      const res = await fetchMonthlyRevenue(); 
      setMonthlyRevenue(res.data.response.transaction);
    } catch (err) {
      console.error("Failed to fetch revenue data", err);
    }
  };

  useEffect(() => {
    fetchRevenue();
  }, []);

  return (
    <div className="mt-2">
    <ResponsiveContainer width="100%" height={280}>
      <BarChart 
        data={monthlyRevenue} 
        // Adjust bar padding to make them appear wider and spaced like the image
        barCategoryGap="25%" // Increased gap for visual matching
        margin={{ top: 10, right: 0, left: -20, bottom: 0 }} // Adjusted margin to pull Y-axis closer to the edge
      >
        {/* Use the light horizontal lines seen in the image, but remove the vertical ones */}
        <CartesianGrid
          strokeDasharray="3 3" 
          vertical={false} 
          stroke="#f0f0f0" 
        />

        {/* XAxis for months - clean and centered */}
        <XAxis 
          dataKey="month" 
          tickLine={false} // Remove tick lines
          axisLine={false} // Remove the axis line
          padding={{ left: 10, right: 10 }}
          className="text-xs font-semibold text-gray-600"
          // Ensure month names are fully visible and centered under the bars
          interval={0} 
        />
        
        {/* YAxis for amounts - clean and using a compact format (like $100K) */}
        <YAxis 
          axisLine={false} // Remove the axis line
          tickLine={false} // Remove tick lines
          tickFormatter={(value: number) => `\₹${(value / 1000).toFixed(0)}K`} // Format Y-axis ticks
          className="text-xs text-gray-500"
          // Set domain to ensure the chart starts from 0 (or slightly below min)
          domain={[0, 'auto']} 
        />
        
        {/* Use the custom tooltip for a cleaner look */}
        
        
        {/* Bar style - using the vibrant violet color from the image */}
        <Bar 
          dataKey="amount" 
          fill="#6366F1" // Tailwind violet-500
          minPointSize={5}
          // Use radius to create the rounded top corners visible in the image
          radius={[8, 8, 0, 0]} // Increased radius for more prominent rounding
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
  );
}

export default RevenueBarChart;
