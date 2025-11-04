import { z } from 'zod'

export const whoIAmSchema = z.object({
  title: z.string().min(1, 'Título obrigatório'),
  summary: z.array(z.string()).default([]),
  mainImageUrl: z.string().url('URL de imagem inválida'),
  fullText: z.string().min(1, 'Texto completo obrigatório'),
  status: z.enum(['draft', 'published']).default('published')
})

export const whoIAmPartialSchema = whoIAmSchema.partial()

export type WhoIAmData = z.infer<typeof whoIAmSchema>
export type WhoIAmPartial = z.infer<typeof whoIAmPartialSchema>

