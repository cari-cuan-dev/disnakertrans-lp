import { Pool } from 'pg';

// Create a separate database pool for the kerjaberkah database
const kerjaBerkahPool = new Pool({
  connectionString: process.env.DATABASE_URL_KERJABERKAH,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

export { kerjaBerkahPool };