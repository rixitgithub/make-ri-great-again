import Link from 'next/link'
import { cn } from '@/lib/utils'
import { PATH } from '@/utils/constants/others/paths'
import type { FieldRow } from '@/components/shared/RiForm/RiForm'

export const SignupFormFields = (plan?: string | null): FieldRow[] => [
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
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Email Address',
    },
  ],
  [
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Create Password',
    },
  ],
  [
    {
      name: 'agreeToTerms',
      inputClassName: 'place-self-start mt-1',
      labelClassName: cn('flex w-full text-xs text-left'),
      type: 'checkbox',
      checkboxLabel: (
        <div className="leading-relaxed text-left">
          I acknowledge and agree to ReachInbox&apos;s{' '}
          <Link href={PATH.TERMS} target="_blank">
            <span className="underline text-primary hover:text-primary/80">
              Terms of Service
            </span>
          </Link>
          ,{' '}
          <Link href={PATH.PRIVACY_POLICY} target="_blank">
            <span className="underline text-primary hover:text-primary/80">
              Privacy Policy
            </span>
          </Link>{' '}
          and{' '}
          {plan?.includes('monthly') ? (
            <Link href={PATH.REFUND_POLICY} target="_blank">
              <span className="underline text-primary hover:text-primary/80">
                No Refund Policy.
              </span>
            </Link>
          ) : (
            <Link href={PATH.REFUND_POLICY} target="_blank">
              <span className="underline text-primary hover:text-primary/80">
                Refund Policy
              </span>
            </Link>
          )}
        </div>
      ),
    },
  ],
]

