import { Hono } from 'hono';
import { loginRequestSchema } from '@chalista/types';
import type { AppEnv } from '../env.ts';
import { signJwt } from '../lib/jwt.ts';
import { parseJsonBody } from '../lib/parse.ts';
import { requireAuth } from '../middleware/auth.ts';
import { repository } from '../repository.ts';

export const authRoutes = new Hono<AppEnv>()
  .post('/login', async (c) => {
    const parsed = await parseJsonBody(c, loginRequestSchema);
    if (!parsed.ok) {
      return parsed.response;
    }

    const user = repository.findUserByEmail(parsed.data.email);
    if (!user || user.password !== parsed.data.password) {
      return c.json({ error: 'invalid_credentials', message: 'Email atau password salah' }, 401);
    }

    const token = await signJwt({ sub: user.id, email: user.email }, c.env.JWT_SECRET);
    const { password: _password, ...safeUser } = user;
    return c.json({ token, user: safeUser });
  })
  .get('/me', requireAuth, (c) => {
    const user = repository.findUserById(c.get('userId') ?? '');
    if (!user) {
      return c.json({ error: 'not_found', message: 'User tidak ditemukan' }, 404);
    }
    const { password: _password, ...safeUser } = user;
    return c.json(safeUser);
  });
