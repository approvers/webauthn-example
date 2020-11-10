import { useEffect, useState } from 'react';
import { Avatar, Email, Name, Panel, Spinner } from '../components';
import { Storage } from '../services';
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
    () => setUser(Storage.user.load()),
    [],
  );

  return (
    <Panel>
      <Inner user={ user } />
    </Panel>
  );
};

export default Login;
