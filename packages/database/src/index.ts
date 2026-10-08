import { PGlite } from '@electric-sql/pglite';
import { drizzle as drizzlePglite } from 'drizzle-orm/pglite';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema.js';

let dbInstance: any = null;

export function getDatabase() {
  if (dbInstance) return dbInstance;

  const dbUrl = process.env.DATABASE_URL;
  if (dbUrl && dbUrl.startsWith('postgres')) {
    const pool = new Pool({ connectionString: dbUrl });
    dbInstance = drizzlePg(pool, { schema });
  } else {
    // In-memory / embedded Postgres WASM client (PGlite) for instant zero-dependency local dev
    const client = new PGlite();
    dbInstance = drizzlePglite(client, { schema });
  }
  return dbInstance;
}

export * from './schema.js';
export { schema };
