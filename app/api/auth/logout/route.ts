import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out successfully' });
  // Clear NextAuth session cookies
  response.cookies.delete('next-auth.session-token');
  response.cookies.delete('next-auth.csrf-token');
  response.cookies.delete('next-auth.callback-url');
  // Clear any legacy custom JWT cookies
  response.cookies.delete('token');
  response.cookies.delete('session');
  return response;
}
