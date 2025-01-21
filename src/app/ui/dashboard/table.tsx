'use client';

import React from 'react';
import { User } from '@/app/@lib/definitions';

interface Props {
  users?: User[];
}

export default function UserTable({ users }: Props) {
  // console.log('users:', users);
  return (
    <div>
      <div>
        {users?.map(
          (user, index) =>
            index < 10 && <div key={user.uid}>{user.username}</div>
        )}
      </div>
    </div>
  );
}
