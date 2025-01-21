import { fetchAllUser } from '@/app/@lib/data';
import UserTable from '@/app/ui/dashboard/table';

export default async function Home() {
  const users = await fetchAllUser();

  return (
    <div className='h-full p-8'>
      <div className='h-full rounded-lg bg-white'>
        <UserTable users={users} />
      </div>
      <div>dash</div>
    </div>
  );
}
