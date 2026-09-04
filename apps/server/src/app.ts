import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { AppEnv } from './env.ts';
import { authRoutes } from './routes/auth.ts';
import { coursesRoutes } from './routes/courses.ts';
import { enrollmentsRoutes } from './routes/enrollments.ts';
import { liveSessionsRoutes } from './routes/live-sessions.ts';
import { zoomRoutes } from './routes/zoom.ts';

export function createApp(): Hono<AppEnv> {
  const app = new Hono<AppEnv>();

  app.use(
    '*',
    cors({
      origin: (origin, c) => {
        const allowed = (c.env.CORS_ORIGIN ?? '')
          .split(',')
          .map((value) => value.trim())
          .filter(Boolean);
        // Izinkan tooling lokal (curl / Hoppscotch) tanpa header Origin.
        if (allowed.includes(origin)) {
          return origin;
        }
        return undefined;
      },
      allowMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization'],
      maxAge: 86400,
    }),
  );

  app.get('/api/health', (c) => c.json({ status: 'ok', service: 'chalista-api' }));

  app.route('/api/auth', authRoutes);
  app.route('/api/courses', coursesRoutes);
  app.route('/api/enrollments', enrollmentsRoutes);
  app.route('/api/live-sessions', liveSessionsRoutes);
  app.route('/api/zoom', zoomRoutes);

  app.notFound((c) => c.json({ error: 'not_found', message: 'Endpoint tidak ditemukan' }, 404));

  app.onError((error, c) => {
    console.error('[api] unhandled error:', error);
    return c.json({ error: 'internal_error', message: 'Terjadi kesalahan internal' }, 500);
  });

  return app;
}
