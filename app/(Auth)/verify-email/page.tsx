'use client'

import { Suspense, useLayoutEffect } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import Cookies from 'js-cookie'
import { SplitLayout } from '@/components/Block/Auth'
import { Button } from '@/components/ui/button'
import useCountDownHook from '@/hooks/useCountDownHook'
import { resendVerificationLink } from '@/utils/apis/auth'
import { COOKIES } from '@/utils/constants/others/cookies'
import { PATH } from '@/utils/constants/others/paths'
import { clearCookies } from '@/utils/helpers/others/cookies'

const VerifyEmailContent = () => {
  const router = useRouter()
  const search = useSearchParams()
  const { resendTimer, setTimer } = useCountDownHook()
  const email = search.get('email')
  const token = search.get('token')

  // Checking for white spaces and replacing them with + as '+' is rendered as whiteSpace
  const correctedEmail = email?.replace(/\s/g, '+')

  useLayoutEffect(() => {
    const handleTokenValidation = () => {
      const verified = Cookies.get(COOKIES.VERIFIED)

      if (token) {
        clearCookies('', false)

        Cookies.set(COOKIES.VERIFIED, 'false')
        Cookies.set(COOKIES.AUTH_TOKEN, token)
        if (correctedEmail) {
          Cookies.set(COOKIES.REGISTERED_EMAIL, correctedEmail)
        }
      } else if (verified !== 'false') {
        if (verified === 'true') {
          router.push(PATH.EMAIL_ACCOUNTS)
        } else {
          router.push(PATH.SIGNIN)
        }
      }
    }

    handleTokenValidation()
  }, [router, correctedEmail, token])

  const handleChangeEmail = () => {
    clearCookies()
    router.push(PATH.SIGNUP)
  }

  const handleResendVerification = () => {
    const registeredEmail = Cookies.get(COOKIES.REGISTERED_EMAIL)
    if (!registeredEmail) return

    resendVerificationLink({
      payload: {
        email: registeredEmail,
      },
    })
    setTimer()
  }

  return (
    <SplitLayout
      showLogo={true}
      logoPosition="top-left"
      leftContentClassName="max-w-full flex-1 flex flex-col items-center justify-center"
    >
      <div className="flex flex-col justify-center items-center w-full max-w-[440px] text-center animate-in fade-in slide-in-from-bottom-4 duration-500 -mt-12 md:-mt-20">
        <div>
          <Image
            src="https://assets.reachinbox.xyz/ri-mailer-fe-nextjs/staging/icons/auth/verify-mail.png"
            alt="Verification email"
            width={120}
            height={120}
            className="drop-shadow-2xl mb-4"
            unoptimized
          />
        </div>

        <div className="flex flex-col gap-3 md:gap-4 mb-8">
          <h1 className="text-white text-2xl md:text-3xl font-bold leading-tight tracking-tight">
            You’re Almost In
          </h1>
          <div className="flex flex-col gap-2 text-gray-400 text-sm md:text-base font-normal leading-relaxed">
            <p>
              We have sent a verification email to your inbox to confirm your
              registration.
            </p>
            <p className="text-gray-400">
              If you don&apos;t see it there, check your spam or promotions
              folder.
            </p>
            <p className="mt-2 text-gray-400 font-medium">
              Once verified, you&apos;ll unlock the full power of ReachInbox.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-[380px]">
          <Button
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-bold rounded-xl transition-all shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99]"
            onClick={handleResendVerification}
            disabled={resendTimer > 0}
          >
            {resendTimer > 0
              ? `Resend in ${resendTimer}s`
              : 'Resend verification email'}
          </Button>

          <button
            onClick={handleChangeEmail}
            className="text-gray-400 hover:text-white transition-colors text-sm font-medium underline underline-offset-4 decoration-gray-400/30"
          >
            Change Email Address
          </button>
        </div>
      </div>
    </SplitLayout>
  )
}

const Page = () => {
  return (
    <Suspense fallback={null}>
      <VerifyEmailContent />
    </Suspense>
  )
}

export default Page
