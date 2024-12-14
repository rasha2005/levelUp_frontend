"use client"

import { getWallet } from "@/app/lib/api/instructorApi";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";


function Graph({transactions}:any) {
    console.log("tr" , transactions);
    const formattedData = transactions.reduce((acc:any, txn:any) => {
        const date = new Date(txn.createdAt).toISOString().split("T")[0]; // Extract date
        if (!acc[date]) {
          acc[date] = { date, totalAmount: 0 };
        }
        acc[date].totalAmount += txn.amount;
        return acc;
      }, {});
      
      // Step 2: Convert to Array for Graph Libraries
      const graphData = Object.values(formattedData);
   

    
    return (
        <>
        <div className="mt-6">

         <LineChart width={500} height={300} data={graphData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="totalAmount" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
        </div>
        </>
    )
}

export default Graph;