import { match } from 'assert';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
  let cookie = request.cookies.get('accessToken');
  if (cookie) {
    console.log('middleware: ', cookie);
  } else {
    console.log('middleware2: ', request.url);
    return NextResponse.redirect(new URL("/login", request.url));
  };
  // // 프론트 서버 요청을 완료하기 전 쿠키에서 accessToken을 가져와서 만료되었는지 확인
  // let cookie = request.cookies.get("accessToken");
  // if (cookie && isTokenExpired(cookie.value)) {
  //   const result = await getAccessTokenWithRefreshToken();

  //   if (result !== "EXPIRED") {
  //     const response = NextResponse.next();
  //     response.cookies.set("accessToken", result.accessToken);
  //     return response;
  //   } else {
  //     return NextResponse.redirect(new URL("/login", request.url));
  //   }
  // }
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  matcher: ['/']
};
