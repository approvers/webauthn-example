import { Client, Expr, query as q, values as v } from 'faunadb';
import { env } from 'process';
import { User } from '../../dto';

export class FaunaClient {
  private readonly client: Client;
  public readonly user: FaunaCollectionClient<User>;

  constructor(
    secret: string,
  ) {
    this.client = new Client({
      secret,
    });

    this.user = this.createCollectionClient('users', 'user_id');
  }

  private createCollectionClient<T>(collection: string, index: string): FaunaCollectionClient<T> {
    return new FaunaCollectionClient<T>(
      this.client,
      collection,
      index,
    );
  }
}

export class FaunaCollectionClient<T> {
  constructor(
    private client: Client,
    private collection: string,
    private index: string,
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

    return await this.client.query(
      q.Get(
        this.ref(key),
      ),
    );
  }

  async persist(user: User): Promise<void> {
    if (await this.exists(user.id)) {
      return void await this.client.query(
        q.Update(
          this.ref(user.id),
          {
            data: user,
          },
        ),
      );
    }

    await this.client.query(
      q.Create(
        q.Collection(this.collection),
        {
          data: user,
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
