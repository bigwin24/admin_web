import { NextRequest, NextResponse } from 'next/server';
import { signOut } from 'next-auth/react';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest, res: NextResponse) {
  console.log('로그아웃');
  if (req.method === 'POST') {
    try {
      // Clear the session cookie
      const cookieStore = await cookies();

      cookieStore.delete('accessToken');
      cookieStore.delete('refreshToken');
      cookieStore.delete('authjs.session-token');

      return NextResponse.json(
        { message: 'Logged out successfully' },
        { status: 200 }
      );
    } catch (error) {
      console.log('Error: ', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';

      return NextResponse.json(
        { message: 'Internal Server Error', error: errorMessage },
        { status: 500 }
      );
    }
  }
}
