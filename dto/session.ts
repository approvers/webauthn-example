import { User } from './user';

export type Session = {
  user: User,
  secret: string,
};
