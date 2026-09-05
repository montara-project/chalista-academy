import { z } from 'zod'

export const LessonFormSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  durationMinutes: z.number().int().positive(),
})

export const CourseModuleFormSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  lessons: z.array(LessonFormSchema),
})

export const courseLevelSchema = z.enum(['beginner', 'intermediate', 'advanced'])
export type CourseLevel = z.infer<typeof courseLevelSchema>

export const CourseFormSchema = z.object({
  id: z.string(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  description: z.string(),
  instructor: z.string().min(1),
  level: courseLevelSchema,
  modules: z.array(CourseModuleFormSchema),
  published: z.boolean(),
  createdAt: z.iso.datetime(),
})

export const CreateCourseRequestSchema = CourseFormSchema
  .omit({ id: true, createdAt: true })
  .partial({ modules: true, published: true })

export type CreateCourseRequestDto = z.infer<typeof CreateCourseRequestSchema>

export const UpdateCourseRequestSchema = CreateCourseRequestSchema.partial()
export type UpdateCourseRequestDto = z.infer<typeof UpdateCourseRequestSchema>

export type LessonFormDto = z.infer<typeof LessonFormSchema>
export type CourseModuleDto = z.infer<typeof CourseModuleFormSchema>
export type CourseDto = z.infer<typeof CourseFormSchema>

export const courseSummarySchema = CourseFormSchema.omit({ modules: true })
export type CourseSummaryDto = z.infer<typeof courseSummarySchema>
