import { unstable_noStore as noStore } from 'next/cache';
import { getToken } from './getToken';
import { NextApiRequest } from 'next';
import { cookies } from 'next/headers';

export async function fetchAllUser() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  // noStore();

  // Artificially delay a response for demo purposes.
  // Don't do this in production :)

  console.log('[fetchAllUser] Fetching...');
  const baseUrl = 'https://api.momstart.co.kr/v2/mnts/users/all';
  const params = {
    page: '-1',
    order: 'name',
  };

  const queryString = new URLSearchParams(params).toString();
  const url = `${baseUrl}?${queryString}`;
  const cookieStore = await cookies();
  const cookie = cookieStore.get('access_token');
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookie?.value}`,
      },
    });

    const result = await res.json();
    console.log('[fetchAllUser] Success');
    return result;
  } catch (error) {
    console.log('[fetchAllUser] Error: ', error);
  }
}
