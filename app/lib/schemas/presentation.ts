import { z } from 'zod'

export const presentationSchema = z.object({
  mainText: z.string().optional(),
  subText: z.string().optional(),
  imageUrl: z.string().url('URL inválida').nullable().optional(),
  status: z.enum(['draft', 'published']).default('published')
})

export const presentationPartialSchema = presentationSchema.partial()

export type PresentationData = z.infer<typeof presentationSchema>
export type PresentationPartial = z.infer<typeof presentationPartialSchema>

