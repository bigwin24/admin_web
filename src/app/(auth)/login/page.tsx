import LoginForm from '@/app/ui/login-form';
import { auth } from '@/auth';

async function page() {
  const session = await auth();
  console.log('login page session: ', session);

  return (
    <main className='flex items-center justify-center h-screen bg-orange-200'>
      <div className='relative mx-auto flex w-full min-w-[400px] md:max-w-[600px] flex-col space-y-2.5 p-4'>
        <div className='w-32 text-white md:w-36'></div>
        <LoginForm />
      </div>
    </main>
  );
}

export default page;
