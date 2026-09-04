import { Hono } from 'hono';
import { createLiveSessionRequestSchema, updateLiveSessionRequestSchema } from '@chalista/types';
import type { AppEnv } from '../env.ts';
import { parseJsonBody } from '../lib/parse.ts';
import { requireAuth } from '../middleware/auth.ts';
import { repository } from '../repository.ts';

export const liveSessionsRoutes = new Hono<AppEnv>()
  .get('/', (c) => {
    const courseId = c.req.query('courseId');
    return c.json(repository.listLiveSessions(courseId));
  })
  .get('/:id', (c) => {
    const session = repository.findLiveSession(c.req.param('id'));
    if (!session) {
      return c.json({ error: 'not_found', message: 'Sesi live tidak ditemukan' }, 404);
    }
    return c.json(session);
  })
  .post('/', requireAuth, async (c) => {
    const parsed = await parseJsonBody(c, createLiveSessionRequestSchema);
    if (!parsed.ok) {
      return parsed.response;
    }
    return c.json(repository.createLiveSession(parsed.data), 201);
  })
  .patch('/:id', requireAuth, async (c) => {
    const parsed = await parseJsonBody(c, updateLiveSessionRequestSchema);
    if (!parsed.ok) {
      return parsed.response;
    }
    const updated = repository.updateLiveSession(c.req.param('id'), parsed.data);
    if (!updated) {
      return c.json({ error: 'not_found', message: 'Sesi live tidak ditemukan' }, 404);
    }
    return c.json(updated);
  })
  .delete('/:id', requireAuth, (c) => {
    const deleted = repository.deleteLiveSession(c.req.param('id'));
    if (!deleted) {
      return c.json({ error: 'not_found', message: 'Sesi live tidak ditemukan' }, 404);
    }
    return c.body(null, 204);
  });
