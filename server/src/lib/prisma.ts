import { PrismaClient } from '../../generated/prisma/client';

declare global {
    // eslint-disable-next-line no-var
    var __prisma: PrismaClient | undefined;
}

function getDatasourceUrl(): string | undefined {
    const rawUrl = process.env.DATABASE_URL;
    if (!rawUrl) return undefined;

    try {
        const url = new URL(rawUrl);
        const isSupabasePooler = url.hostname.includes('pooler.supabase.com') || url.port === '6543';

        // Supabase pooler (PgBouncer) needs this flag to avoid prepared statement name collisions.
        if (isSupabasePooler && !url.searchParams.has('pgbouncer')) {
            url.searchParams.set('pgbouncer', 'true');
        }

        if (isSupabasePooler && !url.searchParams.has('connection_limit')) {
            url.searchParams.set('connection_limit', '1');
        }

        return url.toString();
    } catch {
        return rawUrl;
    }
}

const datasourceUrl = getDatasourceUrl();

export const prisma =
    globalThis.__prisma ??
    new PrismaClient(
        datasourceUrl
            ? {
                  datasources: {
                      db: {
                          url: datasourceUrl,
                      },
                  },
              }
            : undefined
    );

if (process.env.NODE_ENV !== 'production') {
    globalThis.__prisma = prisma;
}