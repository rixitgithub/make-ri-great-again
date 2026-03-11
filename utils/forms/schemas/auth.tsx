import z from 'zod'

export const AppsumoAuthenticationFormSchema = z.object({
  email: z.string().email().min(5, {
    message: 'Email must be at least 5 characters.',
  }),
  firstName: z.string().min(3, {
    message: 'First name must be at least 3 characters.',
  }),
  lastName: z.string(),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  confirmPassword: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
})
