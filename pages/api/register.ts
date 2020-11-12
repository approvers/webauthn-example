import { randomBytes } from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import { Registration, Session, User } from '../../dto';
import { createDiscordClient } from '../../services/discord';
import { createFaunaClient } from '../../services/fauna';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const register = req.body as Registration;
  const discordClient = createDiscordClient();
  const discordToken = await discordClient.getToken(register.code);
  const discordUser = await discordClient.authenticate(discordToken).getUser();
  const user: User = {
    id: discordUser.id,
    name: `${discordUser.username}#${discordUser.discriminator}`,
    email: discordUser.email,
    avatarUrl: `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`,
  };

  const session: Session = {
    user: user,
    secret: randomBytes(64).toString('base64'),
  };

  const faunaClient = createFaunaClient();
  await faunaClient.user.persist(user);
  await faunaClient.session.persist(session);

  res.json(session);
};
