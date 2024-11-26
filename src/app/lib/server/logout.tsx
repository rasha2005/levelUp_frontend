"use server"

import { cookies } from 'next/headers';

export async function logoutUser() {
  (await cookies()).delete('authToken');
}