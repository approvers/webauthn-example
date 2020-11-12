import { Client, Expr, query as q, values as v } from 'faunadb';
import { env } from 'process';
import { Challenge, Session, User } from '../../dto';

import * as e from './entities';

export class FaunaClient {
  private readonly client: Client;
  public readonly user: FaunaCollectionClient<User>;
  public readonly challenge: FaunaCollectionClient<Challenge>;
  public readonly session: FaunaCollectionClient<Session, e.Session>;

  constructor(
    secret: string,
  ) {
    this.client = new Client({
      secret,
    });

    this.user = this.createCollectionClient('users', 'user_id', 'id');
    this.challenge = this.createCollectionClient('challenges', 'challenge_value', 'value');
    this.session = new FaunaCollectionClient<Session, e.Session>(
      this.client,
      'sessions',
      'session_secret',
      'secret',
      async dto => ({
        user: (await this.user.find(dto.user.id)).ref,
        secret: dto.secret,
      }),
      async entity => ({
        user: (await this.user.findByRef(entity.user)).data,
        secret: entity.secret,
      }),
    );
  }

  private createCollectionClient<T>(collection: string, index: string, keyColumn: string): FaunaCollectionClient<T> {
    return new FaunaCollectionClient<T>(
      this.client,
      collection,
      index,
      keyColumn,
      Promise.resolve,
      Promise.resolve,
    );
  }
}

export class FaunaCollectionClient<T, E = T> {
  constructor(
    private client: Client,
    private collection: string,
    private index: string,
    private keyColumn: string,
    private transform: (dto: T) => Promise<E>,
    private transformReverse: (entity: E) => Promise<T>,
  ) {
  }

  private ref(key: string): Expr {
    return q.Match(
      q.Index(this.index),
      key,
    );
  }

  exists(key: string): Promise<boolean> {
    return this.client.query(
      q.Exists(
        this.ref(key),
      ),
    );
  }

  async find(key: string): Promise<v.Document<T> | null> {
    if (!await this.exists(key)) {
      return null;
    }

    const document: v.Document<E> = await this.client.query(
      q.Get(
        this.ref(key),
      ),
    );

    return {
      ...document,
      data: await this.transformReverse(document.data),
    };
  }

  findByRef(ref: v.Ref): Promise<v.Document<T>> {
    return this.client.query(
      q.Get(ref),
    );
  }

  async persist(dto: T): Promise<void> {
    const key = dto[this.keyColumn];
    const current = await this.find(key);

    if (current !== null) {
      return void await this.client.query(
        q.Update(
          current.ref,
          {
            data: await this.transform(dto),
          },
        ),
      );
    }

    await this.client.query(
      q.Create(
        q.Collection(this.collection),
        {
          data: await this.transform(dto),
        },
      ),
    );
  }
}

export const createFaunaClient = (): FaunaClient => {
  return new FaunaClient(
    env.FAUNA_SECRET_KEY,
  );
};
