"use server"

import { cookies } from 'next/headers';

export async function logoutUser() {
  const cookieStore = await cookies();

  // Get all cookies
  const allCookies = cookieStore.getAll();
  const isProduction:boolean = process.env.NODE_ENV === "production"
  // Iterate through each cookie and delete it
  for (const cookie of allCookies) {
    cookieStore.delete({
      name : cookie.name,  
      path: '/', 
      domain:'axen.cloud',
      secure: true, 
      sameSite: isProduction ?'none' : 'lax'
  });
  }
}