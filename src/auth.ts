import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
// Your own logic for dealing with plaintext password strings; be careful!
// import { saltAndHashPassword } from '@/utils/password';
import { z } from 'zod';
import { cookies } from 'next/headers'

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
        name: 'accessToken',
        value: result.access_token,
        httpOnly: true,
      })
      cookieStore.set({
        name: 'refreshToken',
        value: result.refresh_token,
      })

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
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
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
});

