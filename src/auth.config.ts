import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  // jwt: {
  //   maxAge: 60 * 60 * 24 * 1,
  //   async encode(p) {
  //     console.log('encode: ', p);
  //     return p;
  //   },
  //   async decode(p) {
  //     console.log('decode: ', p);
  //     return null;
  //   },
  // },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    signOut: '/logout',
  },

  // Enable debug messages in the console if you are having problems
  debug: true,

  callbacks: {
    async jwt({ token, user, account }) {
      console.log('Jwt Callback()');
      console.log('token', token);
      console.log('user', user);
      console.log('account', account);
      if (user) {
        console.log('[Jwt Callback]first-login', user);

        return {
          ...token,
        };
      }
      return token;
    },
    async session({ session, token }) {
      console.log('Session Callback()');
      console.log(session);
      console.log(token);

      console.log(session);
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
