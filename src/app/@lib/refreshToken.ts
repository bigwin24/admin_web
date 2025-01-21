export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await fetch(`${process.env.BASIC_URL}/users/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    console.log(refreshToken);

    if (!response.ok) {
      throw new Error('Failed to refresh access token');
    }

    const data = await response.json();
    console.log('[refreshAccessToken]: ', data);
    return { accessToken: data.access_token, refreshToken: data.refresh_token }; //토큰반환
  } catch (error) {
    console.error('[refreshAccessToken] Error: ', error);
    throw error; // 에러를 처리하거나 다시 로그인 페이지로 리디렉션
  }
};
