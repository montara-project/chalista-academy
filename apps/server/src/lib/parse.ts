import type { Context } from 'hono';
import type { ZodType } from 'zod';
import type { AppEnv } from '../env.ts';

/** Validasi error berisi detail field dari zod. */
export interface ValidationErrorDetail {
  path: string;
  message: string;
}

export async function parseJsonBody<T>(
  c: Context<AppEnv>,
  schema: ZodType<T>,
): Promise<{ ok: true; data: T } | { ok: false; response: Response }> {
  let raw: unknown;
  try {
    raw = await c.req.json();
  } catch {
    return {
      ok: false,
      response: c.json({ error: 'invalid_json', message: 'Body harus JSON valid' }, 400),
    };
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const details: ValidationErrorDetail[] = parsed.error.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    }));
    return {
      ok: false,
      response: c.json({ error: 'validation_error', details }, 400),
    };
  }

  return { ok: true, data: parsed.data };
}
