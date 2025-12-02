import { ZenStackClient, type ClientContract } from '@zenstackhq/orm';
import { PostgresDialect } from '@zenstackhq/orm/dialects/postgres';
import { Pool } from 'pg';
import { schema, type SchemaType } from './zenstack/schema';

export type { JsonObject } from '@zenstackhq/orm';
export * as InputTypes from './zenstack/input';
export * as ModelTypes from './zenstack/models';

const dbSingleton = () => {
    return new ZenStackClient(schema, {
        dialect: new PostgresDialect({
            pool: new Pool({
                connectionString: process.env.DATABASE_URL,
            }),
        }),
        log: ['query'],
    });
};

export type DatabaseClient = ClientContract<SchemaType>;

// biome-ignore lint/suspicious/noShadowRestrictedNames: Fix this later
declare const globalThis: {
    dbGlobal: ClientContract<SchemaType>;
} & typeof global;

const db = globalThis.dbGlobal ?? dbSingleton();

export { db };

if (process.env.NODE_ENV !== 'production') globalThis.dbGlobal = db;
