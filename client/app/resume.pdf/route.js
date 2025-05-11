import { NextResponse } from 'next/server';

// This route will handle requests to /resume.pdf
export async function GET() {
  // Redirect to the server's resume API endpoint
  return NextResponse.redirect('http://localhost:3001/api/resume');
} 