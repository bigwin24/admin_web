'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { signOut } from '@/auth';

export default function Header({ session }: any) {
  const pathname = usePathname();
  console.log('header session: ', session);

  return pathname === '/login' ? null : (
    <header className='w-full h-full flex flex-row justify-between p-4 bg-brown text-white'>
      <div className='flex flex-auto w-64 justify-start items-center'>
        <div>logo</div>
        <ul className='flex flex-row cursor-pointer font-bold'>
          <li className='px-4 text-base'>
            <Link href='/'>환자관리</Link>
          </li>
          <li className='px-4'>회원관리</li>
          <li className='px-4'>설정</li>
        </ul>
      </div>
      <div className='flex flex-auto w-24 justify-end items-center'>
        <div>환자검색</div>
        <div>{session.user.name}</div>
        {/* <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button>로그아웃</button>
        </form> */}
      </div>
    </header>
  );
}
