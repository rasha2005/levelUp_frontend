"use client"
import { ResponsiveContainer, PieChart, Pie } from "recharts";
import { getInstructor, getTransaction } from '@/app/lib/api/adminApi';
import {Table , TableBody , TableCell , TableHead , TableHeader , TableRow } from '@/components/ui/table'
import { useEffect, useState } from 'react';

function PieChartComp() {

    const [approvedInstructor , setApprovedInstructor] = useState<any>([]);
    const [notapprovedInstructor , setNotApprovedInstructor] = useState<any>([]);
    const [ instructor , setInstructor] = useState<any>([]);
    const fetchTransaction = async() => {
        const res = await getInstructor();
        console.log("ins", res.data.response.instructorData)
        setInstructor(res.data.response.instructorData)
    }

    useEffect(() => {
        if (instructor.length > 0) {
            const approved:any = [];
            const notApproved:any = [];
    
            instructor.forEach((ele: any) => {
                if (ele.isApproved) {
                    approved.push(ele);
                } else {
                    notApproved.push(ele);
                }
            });
            console.log("appr" , approved)
    
            setApprovedInstructor(approved);
            setNotApprovedInstructor(notApproved);
        }
    }, [instructor]);

    const data = [
        { name: "Approved", value: approvedInstructor.length },
        { name: "Not Approved", value: notapprovedInstructor.length },
      ];

    console.log("aproved" , approvedInstructor)
    useEffect(() => {
        fetchTransaction();
    },[])
    return (
        <>
<ResponsiveContainer width="100%" height={300}>
      
      <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label={({ name }) => name}
          />
      </PieChart>
    </ResponsiveContainer>
        </>
    )
}

export default PieChartComp;