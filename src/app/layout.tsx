import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { auth } from '@/auth';
import Header from '@/app/ui/header';

const geistSans = localFont({
  src: './_fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './_fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  // console.log('main layout session: ', session);

  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-screen`}
      >
        <Header session={session} />

        <div className='h-[calc(100vh-4rem)] bg-gray-200'>{children}</div>
      </body>
    </html>
  );
}
