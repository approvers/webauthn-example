import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Panel, Spinner } from '../components';
import { Api, Routing, Storage } from '../services';
import { User } from '../dto';
import { FC } from '..';

type Query = {
  code: string,
};

const Callback: FC = () => {
  const router = useRouter();

  useEffect(() => {
    const { code } = router.query as Partial<Query>;

    if (!code) {
      return;
    }

    Api.register({ code })
      .then(user => Storage.user.save(user as User))
      .then(() => router.push(Routing.login))
      .catch(console.error)
    ;
  }, [router]);

  return (
    <Panel>
      <p>Registering...</p>
      <Spinner />
    </Panel>
  );
};

export default Callback;
