import { z } from 'zod'

export const EnrollmentFormSchema = z.object({
  id: z.string(),
  userId: z.string(),
  courseId: z.string(),
  createdAt: z.iso.datetime(),
})

export const CreateEnrollmentRequestSchema = z.object({
  courseId: z.string(),
})

export type EnrollmentFormDto = z.infer<typeof EnrollmentFormSchema>
export type CreateEnrollmentRequestDto = z.infer<typeof CreateEnrollmentRequestSchema>
