import z from 'zod'

export const SignupFormSchema = z.object({
  firstName: z
    .string()
    .min(1, {
      message: 'First name is required.',
    })
    .max(50, {
      message: 'First name must be at most 50 characters.',
    }),
  lastName: z
    .string()
    .max(50, {
      message: 'Last name must be at most 50 characters.',
    })
    .optional()
    .or(z.literal('')),
  email: z.string().email('Please enter a valid email').min(5, {
    message: 'Email must be at least 5 characters.',
  }),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters.',
    })
    .max(100, {
      message: 'Password must be at most 100 characters.',
    }),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must agree to the terms to continue.',
    }),
})

