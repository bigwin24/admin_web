import { fetchAllUser } from './lib/data';

export default async function Home() {
  const user = await fetchAllUser();
  console.log('user: ', user);
  return (
    <div className='h-full p-8'>
      <div className='h-full rounded-lg bg-white'>home!</div>
    </div>
  );
}
