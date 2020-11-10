export * from './client';

export type Token = {
  accessToken: string,
  expiresIn: number,
  refreshToken: string,
  scopes: string[],
  tokenType: string,
};

export type User = {
  id: string,
  avatar: string,
  email: string,
  username: string,
  discriminator: string,
};
