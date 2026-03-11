'use client'

import { Suspense, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import Cookies from 'js-cookie'
import z from 'zod'
import { ResetPassword, SplitLayout } from '@/components/Block/Auth'
import GoogleLogo from '@/components/Icon/Social/Google'
import { RiForm } from '@/components/shared/RiForm/RiForm'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/hooks/useToast'
import { loginUser } from '@/utils/apis/auth'
import { COOKIES } from '@/utils/constants/others/cookies'
import { PATH } from '@/utils/constants/others/paths'
import { SigninFormDefaultValues } from '@/utils/forms/defaults/signin'
import { SigninFormFields } from '@/utils/forms/fields/signin'
import { SigninFormSchema } from '@/utils/forms/schemas/signin'

type SigninFormValues = z.infer<typeof SigninFormSchema>

const SigninContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const invitationId =
    searchParams.get('invitationId') || Cookies.get(COOKIES.INVITATION_ID)
  const workspaceId =
    searchParams.get('workspaceId') || Cookies.get(COOKIES.WORKSPACE_ID)

  const [signinLoading, setSigninLoading] = useState(false)
  const [showResetPasswordDialog, setShowResetPasswordDialog] = useState(false)

  const form = useForm({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: SigninFormDefaultValues,
  })

  const handleLogin = (data: SigninFormValues) => {
    Cookies.remove(COOKIES.BUY_PLAN)
    const email = data?.email?.toLowerCase()

    loginUser({
      payload: { ...data, email: email },
      router,
      setLoading: setSigninLoading,
      invitationId,
      workspaceId,
    })

    Cookies.set(COOKIES.REGISTERED_EMAIL, email)
  }

  useEffect(() => {
    if (invitationId && workspaceId) {
      toast({
        type: 'success',
        title:
          'You have been invited to join a workspace. Please login to continue.',
      })
    }
  }, [invitationId, workspaceId])

  const handleGoogleLogin = () => {
    Cookies.remove(COOKIES.BUY_PLAN)
    if (invitationId && workspaceId) {
      Cookies.set(COOKIES.INVITATION_ID, invitationId)
      Cookies.set(COOKIES.WORKSPACE_ID, workspaceId)
    }
    if (typeof window !== 'undefined') {
      const host = window.location.hostname
      window.location.href = `${process.env.NEXT_PUBLIC_PROTOCOL}://${host}/api/v1${PATH.GOOGLE_LOGIN}`
    }
  }

  return (
    <>
      {showResetPasswordDialog && (
        <ResetPassword handleClose={() => setShowResetPasswordDialog(false)} />
      )}

      <SplitLayout>
        <h1 className="text-2xl font-semibold text-white text-center lg:text-left">
          Welcome Back!
        </h1>
        <div className="hidden lg:flex w-full">
          <Button
            variant="outline"
            className="flex gap-1 w-full justify-center items-center text-white border-white/10 hover:bg-card/90 h-11 py-2 px-2.5 rounded-[10px] bg-card self-stretch"
            onClick={handleGoogleLogin}
          >
            <GoogleLogo width={20} height={20} className="mr-1" />
            <p className="font-light">Sign in with Google</p>
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
            fields={SigninFormFields}
            btnText={'Sign In'}
            loading={signinLoading}
            handleSubmit={handleLogin}
            signInButton={true}
            btnParentClass={
              'lg:justify-center justify-between lg:gap-0 gap-5 flex-col'
            }
            btnClass={'w-full h-12 lg:h-10'}
            additionalData={
              <div
                className="text-sm mb-7 font-semibold cursor-pointer"
                onClick={() => {
                  setShowResetPasswordDialog(true)
                }}
              >
                <p>Forgot Password?</p>
              </div>
            }
          />
        </div>
        <div className="hidden lg:flex gap-1 justify-center items-center mt-4 text-sm">
          <p className="text-white/70">{`Don't have an account?`}</p>
          <Link
            href={`${PATH.SIGNUP}?plan=growth-monthly`}
            className="text-primary hover:underline"
          >
            Sign Up
          </Link>
        </div>

        <div className="lg:hidden flex items-center my-10">
          <div className="flex flex-1">
            <Separator />
          </div>
          <p className="flex uppercase text-xs px-2 text-muted-foreground">
            Or sign in through
          </p>
          <div className="flex flex-1">
            <Separator />
          </div>
        </div>
        <div className="flex lg:hidden gap-5">
          <Button
            variant="outline"
            className="flex gap-2 w-full py-6"
            onClick={handleGoogleLogin}
          >
            <GoogleLogo className="text-3xl" />
            <p className="font-light">Sign in with Google</p>
          </Button>
        </div>
      </SplitLayout>
    </>
  )
}

const Page = () => {
  return (
    <Suspense fallback={null}>
      <SigninContent />
    </Suspense>
  )
}

export default Page
