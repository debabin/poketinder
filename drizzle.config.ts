import type { Config } from 'drizzle-kit';

import 'dotenv/config';

export default {
  schema: './src/utils/database/schema.ts',
  out: './generated/database',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL
  }
} satisfies Config;
