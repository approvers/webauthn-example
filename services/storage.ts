import { User } from '../dto';

const createStorage = <T>(key: string) => ({
  exists: (): boolean => localStorage.getItem(key) !== null,
  save: (value: T): void => localStorage.setItem(key, JSON.stringify(value)),
  load: (): T | null => {
    const json = localStorage.getItem(key);
    return json !== null ? JSON.parse(json) : null;
  },
});

export const Storage = {
  user: createStorage<User>('user'),
};
