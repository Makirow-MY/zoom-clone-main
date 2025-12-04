import { ReactNode } from 'react';

import StreamVideoProvider from '@/providers/StreamClientProvider';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import SiginInPage from '../(auth)/sign-in/[[...sigin-in]]/page';

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default RootLayout;
