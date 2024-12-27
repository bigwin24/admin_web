import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from '@/auth.config';
import { cookies } from 'next/headers';
import { z } from 'zod';

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

    const cookieStore = await cookies();
    const setCookie = result['access_token'];

    console.log('setCookiesetCookie: ', setCookie);

    if (setCookie) {
      // 브라우저에 쿠키를 심어주기
      cookieStore.set('access_token', setCookie, {
        httpOnly: true,
      });
    }

    // If no error and we have user data, return it
    if (res.ok) {
      const user = await getUser(result.access_token);
      return {
        ...user,
        access_token: result.access_token,
        refresh_token: result.refresh_token,
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
        username: { label: 'Username', type: 'text' },
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
});
