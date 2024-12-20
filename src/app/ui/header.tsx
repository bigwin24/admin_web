'use client';

import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  console.log('pathname:', pathname);
  return pathname === '/login' ? null : (
    <header className='w-full flex flex-row justify-between p-4 bg-brown text-white'>
      <div className='flex flex-auto w-64 justify-start items-center'>
        <div>logo</div>
        <ul className='flex flex-row cursor-pointer font-bold'>
          <li className='px-4'>환자관리</li>
          <li className='px-4'>회원관리</li>
          <li className='px-4'>설정</li>
        </ul>
      </div>
      <div className='flex flex-auto w-24 justify-end items-center'>
        <div>환자검색</div>
        <div>name</div>
      </div>
    </header>
  );
}
