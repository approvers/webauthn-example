import { NextComponentType, NextPageContext } from 'next';

export type FC<P = unknown, IP = unknown> = NextComponentType<
  NextPageContext,
  IP,
  P
>;
