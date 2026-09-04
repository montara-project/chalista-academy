import { Hono } from 'hono';
import { createCourseRequestSchema, updateCourseRequestSchema } from '@chalista/types';
import type { AppEnv } from '../env.ts';
import { parseJsonBody } from '../lib/parse.ts';
import { requireAuth } from '../middleware/auth.ts';
import { repository } from '../repository.ts';

export const coursesRoutes = new Hono<AppEnv>()
  .get('/', (c) => {
    return c.json(repository.listCourses());
  })
  .get('/:slug', (c) => {
    const course = repository.findCourseBySlug(c.req.param('slug'));
    if (!course) {
      return c.json({ error: 'not_found', message: 'Kursus tidak ditemukan' }, 404);
    }
    return c.json(course);
  })
  .post('/', requireAuth, async (c) => {
    const parsed = await parseJsonBody(c, createCourseRequestSchema);
    if (!parsed.ok) {
      return parsed.response;
    }
    if (repository.findCourseBySlug(parsed.data.slug)) {
      return c.json({ error: 'conflict', message: 'Slug sudah dipakai' }, 409);
    }
    return c.json(repository.createCourse(parsed.data), 201);
  })
  .patch('/:slug', requireAuth, async (c) => {
    const parsed = await parseJsonBody(c, updateCourseRequestSchema);
    if (!parsed.ok) {
      return parsed.response;
    }
    const updated = repository.updateCourse(c.req.param('slug'), parsed.data);
    if (!updated) {
      return c.json({ error: 'not_found', message: 'Kursus tidak ditemukan' }, 404);
    }
    return c.json(updated);
  })
  .delete('/:slug', requireAuth, (c) => {
    const deleted = repository.deleteCourse(c.req.param('slug'));
    if (!deleted) {
      return c.json({ error: 'not_found', message: 'Kursus tidak ditemukan' }, 404);
    }
    return c.body(null, 204);
  });
