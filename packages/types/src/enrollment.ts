import { z } from 'zod';

export const enrollmentSchema = z.object({
  id: z.string(),
  userId: z.string(),
  courseId: z.string(),
  createdAt: z.iso.datetime(),
});
export type Enrollment = z.infer<typeof enrollmentSchema>;

export const createEnrollmentRequestSchema = z.object({
  courseId: z.string(),
});
export type CreateEnrollmentRequest = z.infer<typeof createEnrollmentRequestSchema>;
