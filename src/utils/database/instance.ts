import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

const client = new Client({
  connectionString: process.env.DATABASE_URL
});

client.connect();
export const orm = drizzle(client);
