import { AppProps } from 'next/app';
import { FC } from '..';

import '../styles/globals.css';

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <main className="bg-gray-200 flex flex-col justify-center items-center h-screen">
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
