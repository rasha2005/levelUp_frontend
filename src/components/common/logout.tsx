'use client';

import { logoutUser } from '@/app/lib/server/logout';
import { useRouter } from 'next/navigation';

interface Role {
    role: 'user' | 'instructor' | 'admin'; 
}

export default function LogoutButton({role}:Role) {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    if(role === "instructor" || role === "user") {
        router.push('/login'); 
    }else{
        router.push('/admin/login');
    }
  };

  return (
    <span
      onClick={handleLogout}
      className="cursor-pointer text-red-600"
    >
      Logout
    </span>
  );
}
