import type { Config } from 'drizzle-kit';

import 'dotenv/config';

export default {
  dbCredentials: {
    url: process.env.DATABASE_URL
  },
  dialect: 'postgresql',
  out: './generated/database',
  schema: './src/utils/database/schema.ts'
} satisfies Config;
