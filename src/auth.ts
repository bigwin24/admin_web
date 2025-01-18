import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { cookies } from 'next/headers';
import { authConfig } from './auth.config';

async function getUser(token: string): Promise<any | undefined> {
  try {
    const res = await fetch(`${process.env.BASIC_URL}/users/me`, {
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
    const res = await fetch(`${process.env.BASIC_URL}/accounts/login`, {
      method: 'POST',
      body: JSON.stringify({ username: email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await res.json();
    console.log('Success to fetch user: ', result);

    // If no error and we have user data, return it
    if (res.ok) {
      const cookieStore = await cookies();
      cookieStore.set({
        path: '/',
        maxAge: 60 * 60 * 1,
        name: 'accessToken',
        value: result.access_token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
      cookieStore.set({
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30일,
        name: 'refreshToken',
        value: result.refresh_token,
        secure: process.env.NODE_ENV === 'production',
      });

      const user = await getUser(result.access_token);

      return {
        ...user,
        access_token: result.access_token,
        refresh_token: result.refresh_token,
        expires_at: Date.now() + result.expires_in,
      };
    }
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      authorize: async (credentials) => {
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
        return null;
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      console.log('callbacks: ', auth);
      // Logged in users are authenticated, otherwise redirect to login page
      return auth === null ? false : true;
    },
    redirect: async ({ url, baseUrl }) => {
      console.log('리다이렉트: ', url, baseUrl);
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (url) {
        const { search, origin } = new URL(url);
        const callbackUrl = new URLSearchParams(search).get('callbackUrl');
        if (callbackUrl)
          return callbackUrl.startsWith('/')
            ? `${baseUrl}${callbackUrl}`
            : callbackUrl;
        if (origin === baseUrl) return url;
      }
      return baseUrl;
    },
  },
});
