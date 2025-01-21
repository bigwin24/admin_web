'use client';

import { signOut } from 'next-auth/react';

export default function Button() {
  const handleClick = async () => {
    await signOut();
  };

  return <button onClick={handleClick}>로그아웃</button>;
}
