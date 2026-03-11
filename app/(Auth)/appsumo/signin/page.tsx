'use client'

import { Suspense, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import Cookies from 'js-cookie'
import z from 'zod'
import { ContactSupport } from '@/components/Block/Auth/Appsumo/ContactSupport'
import { Wrapper } from '@/components/Block/Auth/Wrapper'
import { RiCard } from '@/components/shared/RiCard/RiCard'
import { RiForm } from '@/components/shared/RiForm/RiForm'
import { useToast } from '@/hooks/useToast'
import { loginUser } from '@/utils/apis/auth'
import { appsumoOnboard } from '@/utils/apis/others'
import { COOKIES } from '@/utils/constants/others/cookies'
import { PATH } from '@/utils/constants/others/paths'
import { AppsumoAuthenticationFormSchema } from '@/utils/forms/schemas/auth'

const AppsumoSigninContent: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const userEmail = searchParams.get('email')
  const error = searchParams.get('error')
  const { toast } = useToast()
  const [signinLoading, setSigninLoading] = useState(false)

  type FormValues = z.infer<typeof AppsumoAuthenticationFormSchema>

  const form = useForm<FormValues>({
    resolver: zodResolver(AppsumoAuthenticationFormSchema),
    defaultValues: {
      email: userEmail || '',
      firstName: 'Sumoling',
      lastName: '',
      password: '',
      confirmPassword: '',
    },
  })

  const handleLogin = async (data: FormValues) => {
    if (data.password !== data.confirmPassword) {
      toast({
        type: 'failed',
        title: 'Passwords do not match',
      })
      return
    }

    setSigninLoading(false)

    await appsumoOnboard({
      payload: {
        email: data.email,
        newPassword: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    })

    setSigninLoading(false)

    Cookies.remove(COOKIES.FIRST_PAGE)
    Cookies.remove(COOKIES.BUY_PLAN)

    Cookies.set(COOKIES.FIRST_PAGE, PATH.SETTINGS_BILLING)

    loginUser({
      payload: data,
      router,
      setLoading: setSigninLoading,
    })

    if (userEmail) {
      Cookies.set(COOKIES.REGISTERED_EMAIL, userEmail)
    }
  }

  const fields = [
    [
      {
        name: 'email',
        type: 'email',
        label: 'Email Address',
        placeholder: 'Email Address',
        disabled: !!userEmail,
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

  return (
    <>
      {error === 'true' && <ContactSupport />}
      <Wrapper showLeftSide={false}>
        <RiCard title={'Welcome to ReachInbox'} className={'p-10'}>
          <RiForm
            form={form}
            fields={fields}
            btnText={'Set Password'}
            loading={signinLoading}
            handleSubmit={handleLogin}
          />
          <div className="flex gap-1 justify-center items-center mt-5 text-sm">
            <p className="text-muted-foreground">Already have an account?</p>
            <Link href={PATH.SIGNIN}>Sign In</Link>
          </div>
          <div className="flex w-full flex-col gap-1 justify-center items-center mt-5 text-sm">
            <p className="te">By signing in with an account, you agree to</p>
            <p>
              {`ReachInbox's `}
              <Link href={PATH.TERMS} target="_blank">
                <span className="underline">Terms of Service</span>
              </Link>
              {' & '}
              <Link href={PATH.PRIVACY_POLICY} target="_blank">
                <span className="underline">Privacy Policy</span>
              </Link>
            </p>
          </div>
        </RiCard>
      </Wrapper>
    </>
  )
}

const Page: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <AppsumoSigninContent />
    </Suspense>
  )
}

export default Page
