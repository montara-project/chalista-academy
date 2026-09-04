import { z } from 'zod';

export const lessonSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  durationMinutes: z.number().int().positive(),
});
export type Lesson = z.infer<typeof lessonSchema>;

export const courseModuleSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  lessons: z.array(lessonSchema),
});
export type CourseModule = z.infer<typeof courseModuleSchema>;

export const courseLevelSchema = z.enum(['beginner', 'intermediate', 'advanced']);
export type CourseLevel = z.infer<typeof courseLevelSchema>;

export const courseSchema = z.object({
  id: z.string(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  description: z.string(),
  instructor: z.string().min(1),
  level: courseLevelSchema,
  modules: z.array(courseModuleSchema),
  published: z.boolean(),
  createdAt: z.iso.datetime(),
});
export type Course = z.infer<typeof courseSchema>;

export const createCourseRequestSchema = courseSchema
  .omit({ id: true, createdAt: true })
  .partial({ modules: true, published: true });
export type CreateCourseRequest = z.infer<typeof createCourseRequestSchema>;

export const updateCourseRequestSchema = createCourseRequestSchema.partial();
export type UpdateCourseRequest = z.infer<typeof updateCourseRequestSchema>;

/** Versi ringan untuk kartu katalog. */
export const courseSummarySchema = courseSchema.omit({ modules: true });
export type CourseSummary = z.infer<typeof courseSummarySchema>;
