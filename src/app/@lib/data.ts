import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers';

export async function fetchAllUser() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  // noStore();

  // Artificially delay a response for demo purposes.
  // Don't do this in production :)

  console.log('[fetchAllUser] Fetching...');
  const baseUrl = `${process.env.BASIC_URL}/mnts/users/all`;
  const params = {
    page: '-1',
    order: 'name',
  };

  const queryString = new URLSearchParams(params).toString();
  const url = `${baseUrl}?${queryString}`;

  const cookie = await cookies();
  const token = cookie.get('accessToken')?.value || null;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const result = await res.json();
      console.log('[fetchAllUser] Success');
      return result;
    } else {
      console.log('[fetchAllUser] Fail: ', res.status);
    }
  } catch (error) {
    console.log('[fetchAllUser] Error: ', error);
  }
}
