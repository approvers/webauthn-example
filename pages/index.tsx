import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Panel, Spinner } from '../components';
import { Routing, Storage } from '../services';
import { FC } from '..';

const Home: FC = () => {
  const router = useRouter();

  useEffect(
    () => {
      router
        .push(Storage.user.exists() ? Routing.login : Routing.api.oauth)
        .then()
      ;
    },
    [],
  );

  return (
    <Panel>
      <Spinner />
    </Panel>
  );
};

export default Home;
