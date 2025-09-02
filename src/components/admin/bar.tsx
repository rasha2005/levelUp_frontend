"use client"

import { getUsers } from "@/app/lib/api/adminApi";
import { useEffect, useState } from "react";
import { BarChart, Bar, ResponsiveContainer, LabelList, XAxis, YAxis, Tooltip } from 'recharts';
interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    mobile: string;
    img: string | null;
    isBlocked: boolean;
    isGoogleAuth: boolean;
  }

function BarComponent() {
    const [user, setUser] = useState<User[]>([]);
    const [blockedUser, setBlockedUser] = useState<User[]>([]);
    const [activeUser, setActiveUser] = useState<User[]>([]);

    const fetchUser = async () => {
        const res = await getUsers();
        setUser(res.data.response.userData);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        if (user.length > 0) {
            const blocked: User[] = [];
            const active: User[] = [];

            user.forEach((ele: User) => {
               
                if (ele.isBlocked) {
                    blocked.push(ele);
                } else {
                    active.push(ele);
                }
            });

            setBlockedUser(blocked);
            setActiveUser(active);
        }
    }, [user]);

    const data = [
        { name: "Active", value: activeUser.length },
        { name: "Blocked", value: blockedUser.length },
    ];

    return (
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
    );
}

export default BarComponent;
