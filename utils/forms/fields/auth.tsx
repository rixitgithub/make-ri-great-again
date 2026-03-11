import { useSearchParams } from 'next/navigation'

const searchParams = useSearchParams()
const userEmail = searchParams.get('email')

export const AppsumoAuthenticationFormFields = [
  [
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      placeholder: 'Email Address',
      disabled: userEmail ? true : false,
    },
  ],
  [
    {
      name: 'firstName',
      label: 'First Name',
      placeholder: 'First Name',
    },
    {
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Last Name',
    },
  ],
  [
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Password',
    },
  ],
  [
    {
      name: 'confirmPassword',
      type: 'password',
      label: 'Confirm Password',
      placeholder: 'Password',
    },
  ],
]
