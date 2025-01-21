import Link from 'next/link';
import LogoutForm from '@/app/ui/logout-form';

export default async function Header({ session }: any) {
  console.log('header session: ', session);

  return !session ? null : (
    <div className='h-16'>
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
          <LogoutForm />
        </div>
      </header>
    </div>
  );
}
