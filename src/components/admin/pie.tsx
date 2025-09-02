"use client"
import { ResponsiveContainer, PieChart, Pie } from "recharts";
import { getInstructor, getTransaction } from '@/app/lib/api/adminApi';
import {Table , TableBody , TableCell , TableHead , TableHeader , TableRow } from '@/components/ui/table'
import { useEffect, useState } from 'react';
interface Instructor {
    id: string;
    name: string;
    email: string;
    password: string;
    mobile: string;
    category: string;
    description: string;
    experience: string;   
    resume: string;     
    img: string | null;  
    rating: number | null;
    isApproved: boolean;
  }
  

function PieChartComp() {

    const [approvedInstructor , setApprovedInstructor] = useState<Instructor[]>([]);
    const [notapprovedInstructor , setNotApprovedInstructor] = useState<Instructor[]>([]);
    const [ instructor , setInstructor] = useState<Instructor[]>([]);
    const fetchTransaction = async() => {
        const res = await getInstructor();
        setInstructor(res.data.response.instructorData)
    }

    useEffect(() => {
        if (instructor.length > 0) {
            const approved:Instructor[] = [];
            const notApproved:Instructor[] = [];
    
            instructor.forEach((ele: Instructor) => {
                if (ele.isApproved) {
                    approved.push(ele);
                } else {
                    notApproved.push(ele);
                }
            });
    
            setApprovedInstructor(approved);
            setNotApprovedInstructor(notApproved);
        }
    }, [instructor]);

    const data = [
        { name: "Approved", value: approvedInstructor.length },
        { name: "Not Approved", value: notapprovedInstructor.length },
      ];

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