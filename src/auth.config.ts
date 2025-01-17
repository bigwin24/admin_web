import type { NextAuthConfig } from 'next-auth';
import type { User } from '@/app/lib/definitions';

type ExtendedUser = User & {
  access_token: string;
  refresh_token: string;
  expires_at: number;
};

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  events: {
    signIn(message) {
      console.log('signin message', message);
    },
    signOut(message) {
      console.log(message);
    },
  },
  // Enable debug messages in the console if you are having problems
  debug: true,

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log('authorize: ', auth, nextUrl);
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // return Response.redirect(new URL('/', nextUrl));
        return Response.redirect(new URL('/'));
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) {
        console.log('redirect1: ', `${baseUrl}${url}`);
        return `${baseUrl}${url}`;
      }
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) {
        console.log('redirect2: ', url);
        return baseUrl;
      }
      return baseUrl;
    },

    async jwt({ token, user, account }) {
      console.log('Jwt Callback()');
      console.log('token', token);
      console.log('user', user);
      console.log('account', account);
      if (user) {
        console.log('[Jwt Callback]first-login', user);
        // First-time login, save the `access_token`, its expiry and the `refresh_token`
        const euser = user as ExtendedUser;
        return {
          ...token,
          access_token: euser.access_token as string,
          expires_at: euser.expires_at as number,
          refresh_token: euser.refresh_token as string,
        };
      }
      return token;
    },
    async session({ session, token }) {
      console.log('Session Callback()');
      console.log(session);
      console.log(token);
      //4.Jwt Callback으로부터 반환받은 token값을 기존 세션에 추가한다
      // if (token) {
      //   session.access_token = token.access_token as string;
      //   session.refresh_token = token.refresh_token as string;
      // }
      console.log(session);
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;

