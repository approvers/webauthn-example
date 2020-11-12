import { useEffect, useState } from 'react';
import { Avatar, Email, Name, Panel, Spinner } from '../components';
import { Api, Storage } from '../services';
import { FC } from '..';
import { User } from '../dto';

type InnerProps = {
  user: User,
};

const Inner: FC<InnerProps> = ({ user }: InnerProps) => {
  if (!user) {
    return <Spinner />;
  }

  return (
    <>
      <Avatar
        name={ user.name }
        url={ user.avatarUrl }
      />
      <Name>{ user.name }</Name>
      <Email address={ user.email } />
    </>
  );
};

const Login: FC = () => {
  const [user, setUser] = useState(null as User);

  useEffect(
    () => {
      setUser(Storage.user.load());

      (async () => {
        const challenge = await Api.challenge();
        const credential = await navigator.credentials.get({
          publicKey: {
            challenge: Uint8Array.from(atob(challenge.value), c => c.charCodeAt(0)),
            allowCredentials: [
              {
                id: Uint8Array.from(user.credentialId, c => c.charCodeAt(0)),
                type: 'public-key',
              },
            ],
            timeout: 50000,
          },
        });

        console.log(credential);
      })();
    },
    [],
  );

  return (
    <Panel>
      <Inner user={ user } />
    </Panel>
  );
};

export default Login;
