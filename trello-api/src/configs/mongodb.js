import { MongoClient, ServerApiVersion } from 'mongodb';
import { env } from './environment';

/**
 * @typedef {import('mongodb').MongoClient} MongoClient
 * @typedef {import('mongodb').Db} Db
 */
class MongoDBConnection {
  /** @type {Db} */
  #db = null;
  /** @type {MongoClient} */
  #client = null;

  constructor() {
    this.#client = new MongoClient(env.MONGODB_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    });
  }

  async connect() {
    if (!this.#db) {
      await this.#client.connect();
      this.#db = this.#client.db(env.DATABASE_NAME);
    }
  }

  getDb() {
    if (!this.#db) {
      throw new Error('You must connect to the database first');
    }
    return this.#db;
  }

  async disconnect() {
    await this.#client.close();
    this.#db = null;
  }
}

export const mongoDBConnection = new MongoDBConnection();

