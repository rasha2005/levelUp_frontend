"use server"

import { cookies } from 'next/headers';

export async function logoutUser() {
  const cookieStore = await cookies();

  // Get all cookies
  const allCookies = cookieStore.getAll();

  // Iterate through each cookie and delete it
  for (const cookie of allCookies) {
    cookieStore.delete(cookie.name);
  }
}