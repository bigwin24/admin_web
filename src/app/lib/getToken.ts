import { cookies } from 'next/headers';

export const getToken = async () => {
  const cookie = await cookies();
  const token = cookie.get('authjs.session-token')?.value || null;

  return token;
};
