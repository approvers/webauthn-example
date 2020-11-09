import {
  Avatar,
  Email,
  Name,
  Panel,
  Spinner,
} from '../components';

// noinspection JSUnusedGlobalSymbols
export const avatar = (): JSX.Element => (
  <Avatar
    name="Approvers"
    url="https://github.com/approvers.png"
  />
);

// noinspection JSUnusedGlobalSymbols
export const email = (): JSX.Element => (
  <Email address="taro@approvers.dev" />
);

// noinspection JSUnusedGlobalSymbols
export const name = (): JSX.Element => (
  <Name>Taro</Name>
);

// noinspection JSUnusedGlobalSymbols
export const panel = (): JSX.Element => (
  <Panel>
    <p>Hello, Panel!</p>
  </Panel>
);

// noinspection JSUnusedGlobalSymbols
export const spinner = (): JSX.Element => (
  <Spinner />
);

export default {
  title: 'Components',
};
