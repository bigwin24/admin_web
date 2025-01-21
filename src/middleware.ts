import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { refreshAccessToken } from '@/app/@lib/refreshToken';

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value || null;
  const refresh_token = cookieStore.get('refreshToken')?.value || null;

  const { pathname, origin } = req.nextUrl;

  console.log('middleware: ', pathname, origin);

  if (!token && !refresh_token && pathname !== '/login') {
    // 로그인하지 않았으면 로그인 페이지로 리디렉션
    // 로그인 후 리디렉션할 URL을 쿼리 파라미터로 전달
    const loginUrl = new URL('/login', origin);
    loginUrl.searchParams.set('callbackUrl', pathname); // 사용자가 원래 요청한 경로를 쿼리 파라미터로 전달
    return NextResponse.redirect(loginUrl);
  } else {
    if (!token && refresh_token) {
      const new_token = await refreshAccessToken(refresh_token);

      cookieStore.set({
        path: '/',
        maxAge: 60 * 60 * 1,
        name: 'accessToken',
        value: new_token.accessToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
      cookieStore.set({
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30일,
        name: 'refreshToken',
        value: new_token.refreshToken,
        secure: process.env.NODE_ENV === 'production',
      });
    }
  }
  return NextResponse.next(); // 나머지 요청은 그대로 처리
}

export const config = {
  matcher: ['/', '/login', '/detail/:path*', '/dashboard', '/profile/:path*'], // 해당 경로들에만 미들웨어 적용
  // matcher: ['*'], // 모든 경로에서 미들웨어 적용
};
