import z from 'zod'

export const RolesFormSchema = z.object({
  name: z.string({ error: 'name is required' }),
})

export type RoleFormDto = z.infer<typeof RolesFormSchema>
