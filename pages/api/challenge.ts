import { randomBytes } from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import { Challenge } from '../../dto';
import { createFaunaClient } from '../../services/fauna';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method !== 'POST') {
    res.status(405);
    res.end();

    return;
  }

  const now = new Date();
  const challenge: Challenge = {
    value: randomBytes(64).toString('base64'),
    expiresAt: new Date(now.getTime() + 60000),
  };

  await createFaunaClient().challenge.persist(challenge);

  res.status(201);
  res.json(challenge);
};
