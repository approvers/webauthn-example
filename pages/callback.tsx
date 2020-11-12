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

    (async () => {
      const session = await Api.register({ code });
      const user = session.user;

      const challenge = await Api.challenge();
      const credential = await navigator.credentials.create({
        publicKey: {
          challenge: Uint8Array.from(atob(challenge.value), c => c.charCodeAt(0)),
          rp: {
            name: 'Approvers',
            id: 'localhost',
          },
          user: {
            id: Uint8Array.from(user.id, c => c.charCodeAt(0)),
            name: user.email,
            displayName: user.name,
          },
          pubKeyCredParams: [
            {
              alg: -7,
              type: 'public-key',
            },
          ],
          timeout: 50000,
        },
      });

      console.log(credential);

      await router.push(Routing.login);
    })();
  }, [router]);

  return (
    <Panel>
      <p>Registering...</p>
      <Spinner />
    </Panel>
  );
};

export default Callback;
