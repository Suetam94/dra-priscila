import { z } from 'zod'

export const expertiseSchema = z.object({
  title: z.string().min(1, 'Título obrigatório'),
  Icon: z.string().min(1, 'Ícone obrigatório'),
  items: z.array(z.string()).min(1, 'Adicione ao menos um item')
})

export const expertisePartialSchema = expertiseSchema.partial()

export type ExpertiseData = z.infer<typeof expertiseSchema>
export type ExpertisePartial = z.infer<typeof expertisePartialSchema>

