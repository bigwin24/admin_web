// // import NextAuth from 'next-auth';
// // import Credentials from 'next-auth/providers/credentials';
// // import { authConfig } from '@/auth.config';
// // import { cookies } from 'next/headers';
// // import { z } from 'zod';

// // async function getUser(token: string): Promise<any | undefined> {
// //   try {
// //     const res = await fetch('https://api.momstart.co.kr/v2/users/me', {
// //       method: 'GET',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         Authorization: `Bearer ${token}`,
// //       },
// //     });

// //     const result = await res.json();

// //     return result;
// //   } catch (error) {
// //     console.error('Failed to fetch user:', error);
// //     throw new Error('Failed to fetch user.');
// //   }
// // }

// // async function login(
// //   email: string,
// //   password: string
// // ): Promise<any | undefined> {
// //   try {
// //     const res = await fetch('https://api.momstart.co.kr/v2/accounts/login', {
// //       method: 'POST',
// //       body: JSON.stringify({ username: email, password }),
// //       headers: { 'Content-Type': 'application/json' },
// //     });
// //     const result = await res.json();
// //     console.log('Success to fetch user: ', result);

// //     // If no error and we have user data, return it
// //     if (res.ok) {
// //       const user = await getUser(result.access_token);

// //       return {
// //         ...user,
// //         access_token: result.access_token,
// //         refresh_token: result.refresh_token,
// //         expires_at: Date.now() + result.expires_in,
// //       };
// //     }
// //   } catch (error) {
// //     console.error('Failed to fetch user:', error);
// //     throw new Error('Failed to fetch user.');
// //   }
// // }

// // export const { auth, signIn, signOut } = NextAuth({
// //   ...authConfig,
// //   providers: [
// //     Credentials({
// //       name: 'Credentials',
// //       // The credentials is used to generate a suitable form on the sign in page.
// //       // You can specify whatever fields you are expecting to be submitted.
// //       // e.g. domain, username, password, 2FA token, etc.
// //       // You can pass any HTML attribute to the <input> tag through the object.
// //       credentials: {
// //         username: { label: 'Username', type: 'text' },
// //         password: { label: 'Password', type: 'password' },
// //       },
// //       async authorize(credentials) {
// //         console.log('credentials:', credentials);
// //         const parsedCredentials = z
// //           .object({ email: z.string().email(), password: z.string().min(6) })
// //           .safeParse(credentials);

// //         console.log('parsedCredentials: ', parsedCredentials);
// //         if (parsedCredentials.success) {
// //           const { email, password } = parsedCredentials.data;
// //           const res = await login(email, password);
// //           console.log('res: ', res);
// //           if (!res) return null;
// //           return res;
// //         }
// //         // if (parsedCredentials.success) {
// //         //   const { email, password } = parsedCredentials.data;
// //         //   console.log('auth: ', email, password);
// //         //   const user = await getUser(email);
// //         //   console.log('user: ', user);
// //         //   if (!user) return null;
// //         // }

// //         return null;
// //       },
// //     }),
// //   ],
// //   // session: {
// //   //   strategy: 'jwt', // JSON Web Token 사용
// //   //   maxAge: 60 * 60 * 24, // 세션 만료 시간(sec)
// //   // },
// // });

// import NextAuth from 'next-auth';
// import Credentials from 'next-auth/providers/credentials';
// // Your own logic for dealing with plaintext password strings; be careful!
// // import { saltAndHashPassword } from '@/utils/password';
// import { z } from 'zod';

// async function getUser(token: string): Promise<any | undefined> {
//   try {
//     const res = await fetch('https://api.momstart.co.kr/v2/users/me', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const result = await res.json();

//     return result;
//   } catch (error) {
//     console.error('Failed to fetch user:', error);
//     throw new Error('Failed to fetch user.');
//   }
// }

// async function login(
//   email: string,
//   password: string
// ): Promise<any | undefined> {
//   try {
//     const res = await fetch('https://api.momstart.co.kr/v2/accounts/login', {
//       method: 'POST',
//       body: JSON.stringify({ username: email, password }),
//       headers: { 'Content-Type': 'application/json' },
//     });
//     const result = await res.json();
//     console.log('Success to fetch user: ', result);

//     // If no error and we have user data, return it
//     if (res.ok) {
//       const user = await getUser(result.access_token);

//       return {
//         ...user,
//         access_token: result.access_token,
//         refresh_token: result.refresh_token,
//         expires_at: Date.now() + result.expires_in,
//       };
//     }
//   } catch (error) {
//     console.error('Failed to fetch user:', error);
//     throw new Error('Failed to fetch user.');
//   }
// }

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     Credentials({
//       // You can specify which fields should be submitted, by adding keys to the `credentials` object.
//       // e.g. domain, username, password, 2FA token, etc.
//       credentials: {
//         email: {},
//         password: {},
//       },
//       authorize: async (credentials) => {
//         console.log('credentials:', credentials);
//         const parsedCredentials = z
//           .object({ email: z.string().email(), password: z.string().min(6) })
//           .safeParse(credentials);

//         console.log('parsedCredentials: ', parsedCredentials);
//         if (parsedCredentials.success) {
//           const { email, password } = parsedCredentials.data;
//           const res = await login(email, password);
//           console.log('res: ', res);
//           if (!res) return null;
//           return res;
//         }

//         return null;
//       },
//       // authorize: async (credentials) => {
//       //   let user = null;

//       //   // logic to salt and hash password
//       //   const pwHash = saltAndHashPassword(credentials.password);

//       //   // logic to verify if the user exists
//       //   user = await getUserFromDb(credentials.email, pwHash);

//       //   if (!user) {
//       //     // No user found, so this is their first attempt to login
//       //     // Optionally, this is also the place you could do a user registration
//       //     throw new Error('Invalid credentials.');
//       //   }

//       //   // return user object with their profile data
//       //   return user;
//       // },
//     }),
//   ],
// });

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from '@/auth.config';
import { z } from 'zod';

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
      const user = await getUser(result.access_token);

      return {
        ...user,
        accessToken: result.access_token,
        refresh_token: result.refresh_token,
        expires_at: Date.now() + result.expires_in,
      };
    }
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update, // Beta!
} = NextAuth({
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
      },
    }),
  ],
  session: {
    strategy: 'jwt', // JSON Web Token 사용
    maxAge: 60 * 60 * 24, // 세션 만료 시간(sec)
  },
  pages: {
    signIn: '/login', // Default: '/auth/signin'
  },
  callbacks: {
    signIn: async () => {
      return true;
    },
    jwt: async ({ token, user }) => {
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
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
