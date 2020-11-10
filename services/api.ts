import { Registration, User } from '../dto';
import { Routing } from './routing';

export class Api {
  static register(req: Registration): Promise<User> {
    return fetch(Routing.api.register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    })
      .then(response => response.json() as Promise<User>)
    ;
  }
}
