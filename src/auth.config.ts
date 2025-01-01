// import type { NextAuthConfig } from 'next-auth';
// import type { User } from '@/app/lib/definitions';

// type ExtendedUser = User & {
//   access_token: string;
//   refresh_token: string;
//   expires_at: number;
// };

// export const authConfig = {
//   pages: {
//     signIn: '/login',
//   },
//   events: {
//     signIn(message) {
//       console.log('signin message', message);
//     },
//     signOut(message) {
//       console.log(message);
//     },
//   },
//   // Enable debug messages in the console if you are having problems
//   debug: true,

//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       console.log('authorize: ', auth, nextUrl);
//       const isLoggedIn = !!auth?.user;
//       const isOnDashboard = nextUrl.pathname.startsWith('/');
//       if (isOnDashboard) {
//         if (isLoggedIn) return true;
//         return false; // Redirect unauthenticated users to login page
//       } else if (isLoggedIn) {
//         // return Response.redirect(new URL('/', nextUrl));
//         return Response.redirect(new URL('/'));
//       }
//       return true;
//     },
//     async redirect({ url, baseUrl }) {
//       // Allows relative callback URLs
//       if (url.startsWith('/')) {
//         console.log('redirect1: ', `${baseUrl}${url}`);
//         return `${baseUrl}${url}`;
//       }
//       // Allows callback URLs on the same origin
//       else if (new URL(url).origin === baseUrl) {
//         console.log('redirect2: ', url);
//         return baseUrl;
//       }
//       return baseUrl;
//     },

//     async jwt({ token, user, account }) {
//       console.log('Jwt Callback()');
//       console.log('token', token);
//       console.log('user', user);
//       console.log('account', account);
//       if (user) {
//         console.log('[Jwt Callback]first-login', user);
//         // First-time login, save the `access_token`, its expiry and the `refresh_token`
//         const euser = user as ExtendedUser;
//         return {
//           ...token,
//           access_token: euser.access_token as string,
//           expires_at: euser.expires_at as number,
//           refresh_token: euser.refresh_token as string,
//         };
//       } else if (Date.now() < (token.expires_at as number) * 1000) {
//         const currentTime = new Date();
//         const futureTime = new Date(currentTime.getTime() + 86500);

//         console.log(
//           '[Jwt Callback]token_expires',
//           // token,
//           // new Date(token.expires_at as number).getMonth(),
//           // new Date(token.expires_at as number).getDay(),
//           // new Date(token.expires_at as number).getFullYear()
//           new Date().getFullYear(),
//           new Date().getMonth() + 1,
//           new Date().getDate(),
//           futureTime.getDate()
//         );
//         // Subsequent logins, but the `access_token` is still valid
//         return token;
//       } else {
//         console.log('[Jwt Callback]token_refresh', token);
//         // Subsequent logins, but the `access_token` has expired, try to refresh it
//         // if (!token.refresh_token) throw new TypeError('Missing refresh_token');

//         // try {
//         //   // The `token_endpoint` can be found in the provider's documentation. Or if they support OIDC,
//         //   // at their `/.well-known/openid-configuration` endpoint.
//         //   // i.e. https://accounts.google.com/.well-known/openid-configuration

//         //   console.log(
//         //     '[Jwt Callback]token_refresh2',
//         //     JSON.stringify({
//         //       refresh_token: token.refresh_token!,
//         //     })
//         //   );
//         //   const response = await fetch(
//         //     'https://api.momstart.co.kr/v2/users/refresh',
//         //     {
//         //       headers: { 'Content-Type': 'application/json' },
//         //       method: 'POST',
//         //       body: JSON.stringify({
//         //         refresh_token: token.refresh_token!,
//         //       }),
//         //     }
//         //   );

//         //   const tokensOrError = await response.json();

//         //   if (!response.ok) throw tokensOrError;

//         //   const newTokens = tokensOrError as {
//         //     access_token: string;
//         //     expires_in: number;
//         //     refresh_token?: string;
//         //   };

//         //   token.access_token = newTokens.access_token;
//         //   token.expires_at = Math.floor(
//         //     Date.now() / 1000 + newTokens.expires_in
//         //   );
//         //   // Some providers only issue refresh tokens once, so preserve if we did not get a new one
//         //   if (newTokens.refresh_token)
//         //     token.refresh_token = newTokens.refresh_token;
//         //   return token;
//         // } catch (error) {
//         //   console.error('Error refreshing access_token', error);
//         //   // If we fail to refresh the token, return an error so we can handle it on the page
//         //   token.error = 'RefreshTokenError';
//         //   return token;
//         // }
//         return token;
//       }
//     },
//     async session({ session, token }) {
//       console.log('Session Callback()');
//       console.log(session);
//       console.log(token);
//       //4.Jwt Callback으로부터 반환받은 token값을 기존 세션에 추가한다
//       if (token) {
//         session.access_token = token.access_token as string;
//         session.refresh_token = token.refresh_token as string;
//       }
//       console.log(session);
//       return session;
//     },
//   },
//   providers: [], // Add providers with an empty array for now
// } satisfies NextAuthConfig;

import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // 유저 인증 확인
      const isLoggedIn = !!auth?.user;
      // 보호하고 싶은 경로 설정
      // 여기서는 /login 경로를 제외한 모든 경로가 보호 되었다
      const isOnProtected = !nextUrl.pathname.startsWith('/login');

      if (isOnProtected) {
        if (isLoggedIn) return true;
        return false; // '/login' 경로로 강제이동
      } else if (isLoggedIn) {
        // 홈페이지로 이동
        return Response.redirect(new URL('/', nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
