import { NextApiRequest, NextApiResponse } from 'next';
import { Registration, User } from '../../dto';
import { createDiscordClient } from '../../services/discord';
import { createFaunaClient } from '../../services/fauna';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const register = req.body as Registration;
  const client = createDiscordClient();
  const token = await client.getToken(register.code);
  const discordUser = await client.authenticate(token).getUser();
  const user: User = {
    id: discordUser.id,
    name: `${discordUser.username}#${discordUser.discriminator}`,
    email: discordUser.email,
    avatarUrl: `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`,
  };

  await createFaunaClient().user.persist(user);

  res.json(user);
};
