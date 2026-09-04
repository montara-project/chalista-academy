import type { Context, Next } from 'hono';
import type { AppEnv } from '../env.ts';
import { verifyJwt } from '../lib/jwt.ts';

/** Middleware wajib-login: validasi Bearer JWT lalu simpan userId di context. */
export async function requireAuth(c: Context<AppEnv>, next: Next) {
  const header = c.req.header('Authorization');
  if (!header?.startsWith('Bearer ')) {
    return c.json({ error: 'unauthorized', message: 'Token tidak ditemukan' }, 401);
  }

  const payload = await verifyJwt(header.slice(7), c.env.JWT_SECRET);
  if (!payload) {
    return c.json({ error: 'unauthorized', message: 'Token tidak valid atau kedaluwarsa' }, 401);
  }

  c.set('userId', payload.sub);
  await next();
  return undefined;
}
