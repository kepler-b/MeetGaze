import { createClient, RedisClientType } from "redis";

export class RedisService {
  private static instance: RedisService;

  client: RedisClientType | null = createClient({
    url: process.env["REDIS_DATABASE_URL"],
    username: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
  });

  static getInstance() {
    if (!this.instance) {
      this.instance = new RedisService();
    }
    return this.instance;
  } 
}
