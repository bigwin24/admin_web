import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      name: number;
      sub: string;
      type: string;
      token: string;
      id: string;
      iat: number;
      exp: number;
      jti: string;
    };
    access_token: string;
    refresh_token: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token?: string;
    error?: 'RefreshTokenError';
  }
}
