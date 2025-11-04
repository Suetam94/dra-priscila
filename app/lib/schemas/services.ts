import { z } from 'zod'

export const serviceSchema = z.object({
  imageUrl: z.string().url('URL de imagem inválida'),
  title: z.string().min(1),
  content: z.string().min(1)
})

export const servicePartialSchema = serviceSchema.partial()

export type ServiceData = z.infer<typeof serviceSchema>
export type ServicePartial = z.infer<typeof servicePartialSchema>

