'use client';

import { ReactNode, useEffect, useState } from 'react';
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';

import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';
import SiginInPage from '@/app/(auth)/sign-in/[[...sigin-in]]/page';
import { useRouter } from 'next/navigation';

const API_KEY = "fc8dzxhpcru8";

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();
 const router = useRouter()

   
  useEffect(() => {
    if (!API_KEY) throw new Error('Stream API key is missing');

    const client = new StreamVideoClient({
      apiKey: API_KEY,
      user: {
        id: user?.id,
        name: user?.username || user?.id,
        image: user?.imageUrl,
      },
      tokenProvider,
    });

    setVideoClient(client);
  }, [user, isLoaded]);
   if (!isLoaded && !user) {
     router.push('/sign-in')
     return <SiginInPage />;
   }
  if (!videoClient && user) return <Loader />;

  if (isLoaded && user) return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
