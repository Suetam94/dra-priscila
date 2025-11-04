import { z } from 'zod'

export const blogPostSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().url('URL de imagem inválida'),
  link: z.string().url('URL inválida').optional().or(z.string().length(0))
})

export const blogPostPartialSchema = blogPostSchema.partial()

export type BlogPostData = z.infer<typeof blogPostSchema>
export type BlogPostPartial = z.infer<typeof blogPostPartialSchema>
