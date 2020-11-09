import { useEffect, useState } from 'react';
import { Avatar, Email, Name, Panel, Spinner } from '../components';
import { Storage } from '../services';
import { FC } from '..';
import { User } from '../dto';

const Login: FC = () => {
  const [user, setUser] = useState(null as User);

  useEffect(
    () => setUser(Storage.user.load()),
    [],
  );

  return (
    <Panel>
      {
        user
          ? (
            <>
              <Avatar
                name={ user.name }
                url={ user.avatarUrl }
              />
              <Name>{ user.name }</Name>
              <Email address={ user.email } />
            </>
          )
          : (
            <Spinner />
          )
      }
    </Panel>
  );
};

export default Login;
