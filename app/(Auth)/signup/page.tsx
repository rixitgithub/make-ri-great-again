'use client'

import { Suspense, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import Cookies from 'js-cookie'
import z from 'zod'
import { SplitLayout } from '@/components/Block/Auth'
import GoogleLogo from '@/components/Icon/Social/Google'
import { RiForm } from '@/components/shared/RiForm/RiForm'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import useWindowSize from '@/hooks/useWindowSize'
import { createUser } from '@/utils/apis/auth'
import { COOKIES } from '@/utils/constants/others/cookies'
import { PATH } from '@/utils/constants/others/paths'
import { SignupFormDefaultValues } from '@/utils/forms/defaults/signup'
import { SignupFormFields } from '@/utils/forms/fields/signup'
import { SignupFormSchema } from '@/utils/forms/schemas/signup'

type SignupFormValues = z.infer<typeof SignupFormSchema>

const SignupContent = () => {
  const isMobile = useWindowSize()
  const router = useRouter()
  const searchParams = useSearchParams()

  const plan = searchParams.get('plan')

  if (plan) {
    Cookies.set(COOKIES.BUY_PLAN, plan)
  }

  const [hostname, setHostname] = useState(process.env.NEXT_PUBLIC_HOSTNAME)
  const [signupLoading, setSignupLoading] = useState(false)

  const handleGoogleSignup = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_PROTOCOL}://${hostname}/api/v1${PATH.GOOGLE_LOGIN}`
  }

  const form = useForm({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      ...SignupFormDefaultValues,
      email: searchParams.get('email') || SignupFormDefaultValues.email,
    },
  })

  const handleSignup = (data: SignupFormValues) => {
    const email = data?.email?.toLowerCase()

    createUser({
      payload: { ...data, email: email },
      router,
      setLoading: setSignupLoading,
    })

    Cookies.set(COOKIES.REGISTERED_EMAIL, email)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const host = window.location.hostname

      if (host) {
        setHostname(host)
      }
    }
  }, [])

  return (
    <SplitLayout>
      <div className="-mt-6 w-full flex flex-col gap-2 items-center">
        <h1 className="text-center w-full text-gray-200 text-[20px] font-semibold leading-[110.333%] capitalize">
          {isMobile
            ? 'Create an account to get started'
            : 'Create a new account'}
        </h1>

        <div className="hidden lg:flex w-full mt-6">
          <Button
            variant="outline"
            className="flex gap-1 w-full justify-center items-center text-white border-white/10 hover:bg-card/90 h-11 py-2 px-2.5 rounded-[10px] bg-card self-stretch"
            onClick={handleGoogleSignup}
          >
            <GoogleLogo className="text-xl" />
            <p className="font-light">Sign up with Google</p>
          </Button>
        </div>

        <div className="hidden lg:flex items-center my-4 w-full">
          <div className="flex flex-1">
            <Separator className="bg-white/10" />
          </div>
          <p className="flex uppercase text-xs px-2 text-gray-600">OR</p>
          <div className="flex flex-1">
            <Separator className="bg-white/10" />
          </div>
        </div>

        <div className="w-full">
          <RiForm
            form={form}
            fields={SignupFormFields(plan)}
            btnText={'Create an Account'}
            loading={signupLoading}
            handleSubmit={handleSignup}
            signInButton={true}
            btnParentClass={' lg:flex-col lg:gap-4 flex-col gap-5'}
            btnClass={'w-full px-6 h-12 lg:h-10'}
          />
        </div>

        <div className="hidden lg:flex gap-1 justify-center items-center mt-5 text-sm">
          <p className="text-white/70">Already have an account?</p>
          <Link href={PATH.SIGNIN} className="text-primary hover:underline">
            Sign in
          </Link>
        </div>

        <div className="lg:hidden flex items-center my-10">
          <div className="flex flex-1">
            <Separator />
          </div>
          <p className="flex uppercase text-xs px-2 text-muted-foreground">
            or sign up through
          </p>
          <div className="flex flex-1">
            <Separator />
          </div>
        </div>
        <div className="lg:hidden flex gap-5">
          <Button
            variant="outline"
            className="flex gap-2 w-full py-6"
            onClick={handleGoogleSignup}
          >
            <GoogleLogo className="text-3xl" />
            <p className="font-light">Sign up with Google</p>
          </Button>
        </div>
      </div>
    </SplitLayout>
  )
}

const Page = () => {
  return (
    <Suspense fallback={null}>
      <SignupContent />
    </Suspense>
  )
}

export default Page
