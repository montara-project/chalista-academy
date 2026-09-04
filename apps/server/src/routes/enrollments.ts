import { Hono } from 'hono';
import { createEnrollmentRequestSchema } from '@chalista/types';
import type { AppEnv } from '../env.ts';
import { parseJsonBody } from '../lib/parse.ts';
import { requireAuth } from '../middleware/auth.ts';
import { repository } from '../repository.ts';

export const enrollmentsRoutes = new Hono<AppEnv>()
  .use('*', requireAuth)
  .get('/', (c) => {
    return c.json(repository.listEnrollmentsByUser(c.get('userId') ?? ''));
  })
  .post('/', async (c) => {
    const parsed = await parseJsonBody(c, createEnrollmentRequestSchema);
    if (!parsed.ok) {
      return parsed.response;
    }

    const result = repository.createEnrollment(c.get('userId') ?? '', parsed.data.courseId);
    if (result === 'course_not_found') {
      return c.json({ error: 'not_found', message: 'Kursus tidak ditemukan' }, 404);
    }
    if (result === 'exists') {
      return c.json({ error: 'conflict', message: 'Anda sudah terdaftar di kursus ini' }, 409);
    }
    return c.json(result, 201);
  });
