'use client';

import React from 'react';
import Link from 'next/link';

export default function Navigation() {
  const path = [
    { name: '개요', key: 'basic' },
    { name: '예측모델', key: 'pm' },
    { name: '혈당', key: 'bloodsugar' },
  ];

  return (
    <nav>
      {path.map((p) => (
        <Link key={p.key} href={`/detail/${p.key}`}>{`${p.name}`}</Link>
      ))}
    </nav>
  );
}
