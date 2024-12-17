import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';

type ExtendedUser = User & {
  accessToken: string;
  refreshToken: string;
};

async function getUser(token: string): Promise<any | undefined> {
  try {
    const res = await fetch('https://api.momstart.co.kr/v2/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();

    return result;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

async function login(
  email: string,
  password: string
): Promise<any | undefined> {
  try {
    const res = await fetch('https://api.momstart.co.kr/v2/accounts/login', {
      method: 'POST',
      body: JSON.stringify({ username: email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await res.json();
    console.log('login: ', result);

    // If no error and we have user data, return it
    if (res.ok) {
      const user = await getUser(result.access_token);
      return {
        ...user,
        accessToken: result.access_token,
        refreshToken: result.refresh_token,
      };
    }
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('credentials:', credentials);
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        console.log('parsedCredentials: ', parsedCredentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const res = await login(email, password);
          console.log('res: ', res);
          if (!res) return null;
          return res;
        }
        // if (parsedCredentials.success) {
        //   const { email, password } = parsedCredentials.data;
        //   console.log('auth: ', email, password);
        //   const user = await getUser(email);
        //   console.log('user: ', user);
        //   if (!user) return null;
        // }

        return null;
      },
    }),
  ],
  // session: {
  //   strategy: 'jwt', // JSON Web Token 사용
  //   maxAge: 60 * 60 * 24, // 세션 만료 시간(sec)
  // },
  callbacks: {
    async jwt({ token, user }) {
      console.log('Jwt Callback()');
      console.log(token);
      console.log(user);
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        const extendedUser = user as ExtendedUser;
        return {
          ...token,
          accessToken: extendedUser.accessToken,
          refreshToken: extendedUser.refreshToken,
        };
      }
      // user 객체가 없다는 것은 단순 세션 조회를 위한 요청
      // console.log(token);
      return token;
    },
    async session({ session, token }) {
      console.log('Session Callback()');
      console.log(session);
      console.log(token);
      //4.Jwt Callback으로부터 반환받은 token값을 기존 세션에 추가한다
      if (token) {
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
      }
      console.log(session);
      return session;
    },
  },
});
