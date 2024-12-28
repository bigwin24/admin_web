import { fetchAllUser } from './lib/data';
import UserTable from './ui/main/table';

export default async function Home() {
  const users = await fetchAllUser();

  return (
    <div className='h-full p-8'>
      <div className='h-full rounded-lg bg-white'>home!</div>
      <UserTable users={users} />
    </div>
  );
}
