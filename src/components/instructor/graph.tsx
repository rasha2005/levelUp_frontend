"use client"

import { getWallet } from "@/app/lib/api/instructorApi";
import { useState } from "react";
// Import AreaChart and Area for the shaded region
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { FaArrowUp } from 'react-icons/fa'; // Icon for the rank increase

interface Transaction {
  id: string;
  walletId: string;
  amount: number;
  type: "credit" | "debit"; 
  createdAt: string;         
}
interface TransactionProps {
  transactions: Transaction[];
}

interface TransactionSummary {
  date: string;
  totalAmount: number;
}

function Graph({transactions}:TransactionProps) {
 
    // Data aggregation logic remains the same
    const formattedData = transactions.reduce<Record<string, TransactionSummary>>(
      (acc, txn: Transaction) => {
        // Use a shorter date format for X-axis labels (e.g., 'Apr 12')
        const date = new Date(txn.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }); 
        if (!acc[date]) {
          acc[date] = { date, totalAmount: 0 };
        }
        acc[date].totalAmount += txn.amount;
        return acc;
      }, {});
      
    // Sort the data by date before converting to array for correct plotting
    const graphData = Object.values(formattedData).sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );
   
    // Custom label formatter for Y-axis (e.g., 8K, 6K)
    const formatYAxis = (tick: number) => {
        if (tick === 0) return '0';
        return `${tick / 1000}K`;
    };

    
    return (
        <div className="p-4 bg-white rounded-xl h-full flex flex-col">

            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <div className="flex items-end">
                    <div className="flex items-center">
                        <svg className="w-8 h-8 mr-2" viewBox="0 0 36 36">
                            <path className="text-gray-200" d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831a15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.8"/>
                            <path className="text-cyan-500" d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831a15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.8" strokeDasharray="38.8, 100" />
                        </svg>
                        <span className="text-3xl font-bold text-gray-800">38.8%</span>
                        <span className="text-sm font-semibold text-green-500 ml-2 pt-2">+2.3</span>
                    </div>
                </div>

                <div className="flex items-center text-gray-800">
                    
                </div>
            </div>


            <div className="flex-1 mt-4" style={{ height: 'calc(100% - 70px)' }}> 
            <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
                data={graphData} 
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }} 
            >
              
                <defs>
                    <linearGradient id="colorTotalAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8}/> 
                        <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.05}/>
                    </linearGradient>
                </defs>

                <XAxis 
                    dataKey="date" 
                    interval="preserveStartEnd" 
                    tickLine={false} 
                    axisLine={false}
                    stroke="#555"
                    style={{ fontSize: '12px' }}
                />
                
                <YAxis 
                    type="number"
                    tickFormatter={formatYAxis}
                    tickLine={false} 
                    axisLine={false}
                    tickCount={5} 
                    domain={[0, 8000]} 
                    stroke="#555"
                    style={{ fontSize: '12px' }}
                />
                
                <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #ccc' }}
                    labelFormatter={(label) => `Date: ${label}`}
                    formatter={(value) => [`₹${(value as number).toFixed(2)}`, 'Total Amount']}
                    />
                
                <Area 
                    type="monotone" 
                    dataKey="totalAmount" 
                    stroke="#22d3ee" 
                    fill="url(#colorTotalAmount)" 
                    strokeWidth={2}
                    dot={false}
                />
                
            </AreaChart>
            </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Graph;