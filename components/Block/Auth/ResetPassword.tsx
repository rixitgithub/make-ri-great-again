'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { ButtonLoader } from '@/components/shared/Loader'
import { Popup } from '@/components/shared/Popup/Popup'
import { RiForm } from '@/components/shared/RiForm/RiForm'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/useToast'
import { forgetPassword, resetPassword } from '@/utils/apis/auth'

export const ResetPassword = ({ handleClose }) => {
  const { toast } = useToast()

  const [resetLoading, setResetLoading] = useState(false)
  const [hideResetPasswordForm, setHideResetPasswordForm] = useState(true)

  const validationSchema = {
    email: z.string().email().min(5, {
      message: 'Email must be at least 5 characters.',
    }),
  }

  const defaultValues = {
    email: '',
  }

  const formFields = [
    [
      {
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'Email Address',
      },
    ],
  ]

  const formSchema = z.object(validationSchema)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const resetPasswordValidationSchema = {
    email: z.string().email().min(5, {
      message: 'Email must be at least 5 characters.',
    }),
    otp: z.string().min(6, {
      message: 'OTP must be at least 6 characters.',
    }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
    repeatPassword: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
  }

  const resetPasswordDefaultValues = {
    email: '',
    otp: '',
    password: '',
    repeatPassword: '',
  }

  const resetPasswordFormFields = [
    [
      {
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'Email Address',
        disabled: true,
      },
    ],
    [
      {
        name: 'otp',
        label: 'OTP',
        placeholder: 'OTP',
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
        name: 'repeatPassword',
        type: 'password',
        label: 'Repeat Password',
        placeholder: 'Repeat Password',
      },
    ],
  ]

  const resetPasswordFormSchema = z.object(resetPasswordValidationSchema)

  const resetPasswordForm = useForm({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: resetPasswordDefaultValues,
  })

  const handleSendOTP = async (data) => {
    const response = await forgetPassword({
      payload: data,
      setLoading: setResetLoading,
    })

    if (response?.status === 200) {
      resetPasswordForm.setValue('email', data.email)
      setHideResetPasswordForm(false)
    }
  }

  const handleResetPassword = async (data) => {
    if (data.password !== data.repeatPassword) {
      toast({
        type: 'failed',
        title: 'Passwords do not match',
      })
      return
    }

    const response = await resetPassword({
      payload: {
        email: data.email,
        otp: data.otp,
        password: data.password,
      },
      setLoading: setResetLoading,
    })

    if (response?.status === 200) {
      handleClose()
    }
  }

  return (
    <Popup
      title={'Reset Your Password'}
      handleClose={handleClose}
      headerClassName={'!mb-6'}
    >
      <div className="mx-auto space-y-4 mb-2">
        <p className="text-sm text-center mb-8 text-muted-foreground">
          {`To reset your password, enter your registered email address below. We'll send you a secure link to update your password.`}
        </p>
      </div>

      {hideResetPasswordForm ? (
        <RiForm
          form={form}
          fields={formFields}
          handleSubmit={handleSendOTP}
          customButtons={
            <div className="flex justify-start gap-5">
              <Button disabled={resetLoading} className="border-none">
                {resetLoading && <ButtonLoader />}Reset Password
              </Button>
            </div>
          }
        />
      ) : (
        <RiForm
          form={resetPasswordForm}
          fields={resetPasswordFormFields}
          handleSubmit={handleResetPassword}
          customButtons={
            <div className="flex justify-end gap-5">
              <Button asChild variant={'outline'} onClick={handleClose}>
                <p className="cursor-pointer">Cancel</p>
              </Button>
              <Button disabled={resetLoading} className="border-none">
                {resetLoading && <ButtonLoader />}Submit
              </Button>
            </div>
          }
        />
      )}
    </Popup>
  )
}
