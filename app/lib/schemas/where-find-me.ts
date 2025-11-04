import { z } from 'zod'

export const phoneSchema = z.object({
  ddd: z.string().min(1),
  number: z.string().min(1),
  isWhatsapp: z.boolean()
})

export const imageSchema = z.object({
  url: z.string().url('URL inválida'),
  alt: z.string().min(1)
})

export const businessHourSchema = z.object({
  week: z.object({ start: z.string(), end: z.string() }),
  hour: z.object({ start: z.string(), end: z.string() })
})

export const clinicSchema = z.object({
  image: imageSchema,
  name: z.string().min(1),
  address: z.string().min(1),
  phones: z.array(phoneSchema).default([]),
  businessHour: businessHourSchema,
  healthPlan: z.array(z.string()).default([])
})

export const clinicPartialSchema = clinicSchema.partial()

export type ClinicData = z.infer<typeof clinicSchema>
export type ClinicPartial = z.infer<typeof clinicPartialSchema>

