import { NextApiRequest, NextApiResponse } from 'next';
import { Register, User } from '../../dto';
import { createDiscordClient } from '../../services/discord';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const register = req.body as Register;
  const client = createDiscordClient();
  const token = await client.getToken(register.code);
  const user = await client.authenticate(token).getUser();

  res.json(<User>{
    id: user.id,
    name: `${user.username}#${user.discriminator}`,
    email: user.email,
    avatarUrl: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
  });
};
