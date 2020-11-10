import { NextApiRequest, NextApiResponse } from 'next';
import { createDiscordClient } from '../../services/discord';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const client = createDiscordClient();

  res.redirect(
    client.generateOAuthUrl(),
  );
};
