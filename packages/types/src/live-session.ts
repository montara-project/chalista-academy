import { z } from 'zod';

export const liveSessionStatusSchema = z.enum(['scheduled', 'live', 'completed', 'cancelled']);
export type LiveSessionStatus = z.infer<typeof liveSessionStatusSchema>;

export const liveSessionSchema = z.object({
  id: z.string(),
  courseId: z.string(),
  title: z.string().min(1),
  /** Waktu mulai dalam format ISO 8601 (UTC). */
  startsAt: z.iso.datetime(),
  durationMinutes: z.number().int().positive(),
  /** Nomor meeting Zoom, contoh: "823 4567 8901" (disimpan tanpa spasi). */
  meetingNumber: z.string().regex(/^\d{9,11}$/),
  passcode: z.string().min(1),
  status: liveSessionStatusSchema,
});
export type LiveSession = z.infer<typeof liveSessionSchema>;

export const createLiveSessionRequestSchema = liveSessionSchema.omit({ id: true, status: true });
export type CreateLiveSessionRequest = z.infer<typeof createLiveSessionRequestSchema>;

export const updateLiveSessionRequestSchema = createLiveSessionRequestSchema.partial();
export type UpdateLiveSessionRequest = z.infer<typeof updateLiveSessionRequestSchema>;
