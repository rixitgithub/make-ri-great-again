import z from 'zod'

export const SigninFormSchema = z.object({
  email: z.string().email('Please enter a valid email').min(5, {
    message: 'Email must be at least 5 characters.',
  }),
  password: z.string(),
})

