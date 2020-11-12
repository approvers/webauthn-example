import { Client, Expr, query as q, values as v } from 'faunadb';
import { env } from 'process';
import { User } from '../../dto';

export interface IFaunaClient {
  readonly user: IFaunaCollectionClient<User>;
}

export interface IFaunaCollectionClient<T> {
  exists(key: string): Promise<boolean>;
  find(key: string): Promise<v.Document<T> | null>;
  persist(dto: T): Promise<void>;
}

export class FaunaClient implements IFaunaClient {
  private readonly client: Client;
  public readonly user: IFaunaCollectionClient<User>;

  constructor(
    secret: string,
  ) {
    this.client = new Client({
      secret,
    });

    this.user = this.createCollectionClient('users', 'user_id', 'id');
  }

  private createCollectionClient<T>(collection: string, index: string, keyProperty: string): IFaunaCollectionClient<T> {
    return new FaunaCollectionClient<T>(
      this.client,
      collection,
      index,
      keyProperty,
    );
  }
}

export class FaunaCollectionClient<T> implements IFaunaCollectionClient<T> {
  constructor(
    private client: Client,
    private collection: string,
    private index: string,
    private keyProperty: string,
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

  async persist(dto: T): Promise<void> {
    const key = dto[this.keyProperty];
    const current = await this.find(key);

    if (current !== null) {
      return void await this.client.query(
        q.Update(
          current.ref,
          {
            data: dto,
          },
        ),
      );
    }

    await this.client.query(
      q.Create(
        q.Collection(this.collection),
        {
          data: dto,
        },
      ),
    );
  }
}

export const createFaunaClient = (): IFaunaClient => {
  return new FaunaClient(
    env.FAUNA_SECRET_KEY,
  );
};
