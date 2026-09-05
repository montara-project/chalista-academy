import { z } from 'zod'

export const userRoleSchema = z.enum(['student', 'instructor', 'admin'])
export type UserRole = z.infer<typeof userRoleSchema>

export const UserFormSchema = z.object({
  id: z.string(),
  first_name: z.string().min(1),
  last_name: z.string().nullable().optional(),
  email: z.email(),
  role_id: z.string(),
})

export const SignInFormSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
})

export const SignInResponseSchema = z.object({
  token: z.string(),
  user: UserFormSchema,
})

export type UserFormDto = z.infer<typeof UserFormSchema>
export type SignInRequestDto = z.infer<typeof SignInFormSchema>
export type SignInResponseDto = z.infer<typeof SignInResponseSchema>
