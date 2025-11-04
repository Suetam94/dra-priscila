import { z } from 'zod'

export const bookPhoneSchema = z.object({
  ddd: z.string().min(1),
  number: z.string().min(1),
  isWhatsapp: z.boolean()
})

export const bookContactSchema = z.object({
  phones: z.array(bookPhoneSchema).default([]),
  bookingUrl: z.string().url('URL inválida').optional()
})

export const bookImageSchema = z.object({
  url: z.string().url('URL inválida'),
  alt: z.string().min(1)
})

export const bookClinicSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  contact: bookContactSchema,
  image: bookImageSchema
})

export const bookClinicPartialSchema = bookClinicSchema.partial()

export type BookClinicData = z.infer<typeof bookClinicSchema>
export type BookClinicPartial = z.infer<typeof bookClinicPartialSchema>

