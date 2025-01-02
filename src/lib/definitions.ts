import { z } from 'zod'

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'O nome deve ter pelo menos 2 caracteres.' })
    .trim(),
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres.' })
    .regex(/[a-zA-Z]/, { message: 'Deve conter pelo menos uma letra.' })
    .regex(/[0-9]/, { message: 'Deve conter pelo menos um número.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Deve conter pelo menos um caractere especial.',
    })
    .trim(),
})


export const LoginFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Por favor, insira um e-mail válido.' })
    .trim(),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres.' })
    .regex(/[a-zA-Z]/, { message: 'Deve conter pelo menos uma letra.' })
    .regex(/[0-9]/, { message: 'Deve conter pelo menos um número.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Deve conter pelo menos um caractere especial.',
    })
    .trim(),
});

export const SessionPayloadSchema = z.object({
  userId: z.string(),
  email: z.string().email(),
  expiresAt: z.date(),
  userRole: z.enum(['user', 'admin']), 
})

export type SessionPayload = z.infer<typeof SessionPayloadSchema>

