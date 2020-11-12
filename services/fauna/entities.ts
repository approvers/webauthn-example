import { values as v } from 'faunadb';

export type Session = {
  user: v.Ref,
  secret: string,
};
