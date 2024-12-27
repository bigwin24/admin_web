import { unstable_noStore as noStore } from 'next/cache';
import { getToken } from './getToken';
import { NextApiRequest } from 'next';
import { cookies } from 'next/headers';

export async function fetchAllUser() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching all users data...');
    const baseUrl = 'https://api.momstart.co.kr/v2/mnts/users/all';
    const params = {
      measuredDate: `[2020-01-01,2024-12-27]`,
      page: '-1',
      order: 'name',
    };

    const queryString = new URLSearchParams(params).toString();
    const url = `${baseUrl}?${queryString}`;
    const cookieStore = await cookies();
    const cookie = cookieStore.get('access_token');
    console.log('Data fetch completed after 3 seconds!!!: ', cookie);

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookie}`,
      },
    });

    console.log('Data fetch completed after 3 seconds.: ', res, url);

    const result = await res.json();

    // console.log('Data fetch completed after 3 seconds.: ', result);

    return result;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch all users data.');
  }
}
