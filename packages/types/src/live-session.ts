import { z } from 'zod'

export const liveSessionStatusSchema = z.enum(['scheduled', 'live', 'completed', 'cancelled'])
export type LiveSessionStatus = z.infer<typeof liveSessionStatusSchema>

export const LiveSessionFormSchema = z.object({
  id: z.string(),
  courseId: z.string(),
  title: z.string().min(1),
  startsAt: z.iso.datetime(),
  durationMinutes: z.number().int().positive(),
  meetingNumber: z.string().regex(/^\d{9,11}$/),
  passcode: z.string().min(1),
  status: liveSessionStatusSchema,
})
export type LiveSession = z.infer<typeof LiveSessionFormSchema>

export const CreateLiveSessionRequestSchema = LiveSessionFormSchema.omit({ id: true, status: true })
export type CreateLiveSessionRequestDto = z.infer<typeof CreateLiveSessionRequestSchema>

export const UpdateLiveSessionRequestSchema = CreateLiveSessionRequestSchema.partial()
export type UpdateLiveSessionRequestDto = z.infer<typeof UpdateLiveSessionRequestSchema>
