import { Challenge, Registration, Session } from '../dto';
import { Routing } from './routing';

export class Api {
  static register(req: Registration): Promise<Session> {
    return fetch(Routing.api.register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    })
      .then(response => response.json())
      .then(object => object as Session)
    ;
  }

  static challenge(): Promise<Challenge> {
    return fetch(Routing.api.challenge, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(object => object as Challenge)
    ;
  }
}
