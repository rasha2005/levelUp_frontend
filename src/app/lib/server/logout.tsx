"use server"

import { cookies } from 'next/headers';

export async function logoutUser() {
  const cookieStore = await cookies();


  const allCookies = cookieStore.getAll();
  const isProduction:boolean = process.env.NODE_ENV === "production"
  for (const cookie of allCookies) {
    cookieStore.delete({
      name : cookie.name,  
      path: '/', 
      domain:'.levelup.icu',
      secure: true, 
      sameSite: isProduction ?'none' : 'lax'
  });
  }
}