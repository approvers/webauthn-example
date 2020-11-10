type Routes = { [key: string]: string };

const prefixed = <T extends Routes>(prefix: string, routes: T): T => Object.assign(
  {},
  ...Object.keys(routes).map(k => ({ [k]: prefix + routes[k] })),
);

export const Routing = {
  index: '/',
  login: '/login',
  callback: '/callback',
  api: prefixed('/api', {
    oauth: '/oauth',
    register: '/register',
  }),
};
