import { z } from 'zod'

export const doctorInfoSchema = z.object({
  name: z.string().min(1),
  RQE: z.string().min(1),
  CRM: z.string().min(1),
  address: z.string().min(1),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(1)
})

export const doctorInfoPartialSchema = doctorInfoSchema.partial()

export type DoctorInfoData = z.infer<typeof doctorInfoSchema>
export type DoctorInfoPartial = z.infer<typeof doctorInfoPartialSchema>

