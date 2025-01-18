import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const cookie = await cookies();
  const token = cookie.get('accessToken')?.value || null;
  const refresh_token = cookie.get('refreshToken')?.value || null;

  const { pathname, origin } = req.nextUrl;

  console.log('middleware: ', pathname, origin);

  // 로그인하지 않았으면 로그인 페이지로 리디렉션
  if (!token && pathname !== '/login') {
    // 로그인 후 리디렉션할 URL을 쿼리 파라미터로 전달
    const loginUrl = new URL('/login', origin);
    loginUrl.searchParams.set('callbackUrl', pathname); // 사용자가 원래 요청한 경로를 쿼리 파라미터로 전달
    return NextResponse.redirect(loginUrl);
  }
  if (token) {
    const atoken = cookie.get('accessToken');
    console.log('access_token: ', atoken);
  }

  return NextResponse.next(); // 나머지 요청은 그대로 처리
}

export const config = {
  matcher: ['/', '/login', '/detail/:path*', '/dashboard', '/profile/:path*'], // 해당 경로들에만 미들웨어 적용
  // matcher: ['*'], // 모든 경로에서 미들웨어 적용
};
