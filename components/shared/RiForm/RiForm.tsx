'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CircleCheck } from 'lucide-react'
import { RiHover } from '..'
import useWindowSize from '../../../hooks/useWindowSize'
import { cn } from '../../../lib/utils'
import { PATH } from '../../../utils/constants/others/paths'
import { Button } from '../../ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import { Textarea } from '../../ui/textarea'
import { ButtonLoader } from '../Loader'

export interface FieldGroup {
  name: string
  label?: string
  placeholder?: string
  type?: string
  disabled?: boolean
  checkboxLabel?: React.ReactNode
  labelClassName?: string
  inputClassName?: string
  inputComponentType?: 'input' | 'textarea'
  infoContent?: React.ReactNode
  infoContentClassName?: string
}

export type FieldRow = FieldGroup[]

interface RiFormProps {
  form: any
  fields: FieldRow[]
  additionalData?: React.ReactNode
  btnText?: string
  btnClass?: string
  btnParentClass?: string
  className?: string
  customButtons?: React.ReactNode
  loading?: boolean
  imapError?: React.ReactNode
  smtpError?: React.ReactNode
  handleSubmit?: (data: any) => void
  rowsClassName?: string
  FieldComponentType?: 'input' | 'textarea'
  signInButton?: boolean
  formLabelClassName?: string
}

export const RiForm: React.FC<RiFormProps> = ({
  form,
  fields,
  additionalData,
  btnText = 'Submit',
  btnClass,
  btnParentClass,
  className,
  customButtons,
  loading = false,
  imapError,
  smtpError,
  handleSubmit = () => {},
  rowsClassName = 'max-lg:flex-col',
  FieldComponentType = 'input',
  signInButton = false,
  formLabelClassName,
}) => {
  const isMobile = useWindowSize()
  const pathname = usePathname()

  const calculateTextAreaRows = (content?: string) => {
    if (!content) return 1

    const charsPerRow = 40
    const maxRows = 5

    return Math.min(Math.ceil(content.length / charsPerRow), maxRows)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={className || 'flex flex-col gap-5'}
      >
        {fields.map((groups, index) => (
          <div key={index} className={`flex gap-5 w-full ${rowsClassName}`}>
            {groups.map((group) => (
              <FormField
                key={group.name}
                name={group.name}
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
                    {group?.label && (
                      <div className="flex items-center gap-2">
                        {!isMobile && (
                          <FormLabel
                            className={
                              group.labelClassName || formLabelClassName || ''
                            }
                          >
                            {group.label}
                          </FormLabel>
                        )}

                        {group.infoContent && (
                          <RiHover
                            trigger={
                              <CircleCheck className="text-xl text-primary" />
                            }
                            side="top"
                            contentClassName={`w-104 ${group.infoContentClassName}`}
                          >
                            {group.infoContent}
                          </RiHover>
                        )}
                      </div>
                    )}

                    <FormControl>
                      {group.type === 'checkbox' ? (
                        <div className="flex justify-start gap-2 items-center">
                          <input
                            id={group.name}
                            className={cn(
                              'flex justify-start border w-auto',
                              group.inputClassName,
                            )}
                            type={group.type || 'text'}
                            disabled={group?.disabled || false}
                            {...field}
                          />
                          <Label
                            htmlFor={group.name}
                            className={cn(
                              group.labelClassName,
                              !group.labelClassName &&
                                'flex w-full text-xs form-required',
                            )}
                          >
                            {group.checkboxLabel}
                          </Label>
                        </div>
                      ) : (
                        <div>
                          {group.inputComponentType === 'textarea' ? (
                            <Textarea
                              rows={calculateTextAreaRows(field.value)}
                              disabled={group?.disabled || false}
                              className={cn(
                                'border min-h-[40px]',
                                group.inputClassName,
                              )}
                              placeholder={group.placeholder}
                              {...field}
                            />
                          ) : FieldComponentType === 'input' ? (
                            <Input
                              disabled={group?.disabled || false}
                              className={cn('border', group.inputClassName)}
                              placeholder={group.placeholder}
                              type={group.type || 'text'}
                              {...field}
                            />
                          ) : (
                            <Textarea
                              rows={calculateTextAreaRows(field.value)}
                              disabled={group?.disabled || false}
                              className="border min-h-[40px]"
                              placeholder={group.placeholder}
                              {...field}
                            />
                          )}

                          {group.name === 'imapHost' && imapError}
                          {group.name === 'smtpHost' && smtpError}
                        </div>
                      )}
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        ))}

        <div className="flex flex-1">{additionalData}</div>

        {customButtons || (
          <div className={`flex justify-center ${btnParentClass || ''}`}>
            <Button
              type="submit"
              disabled={loading}
              className={`w-full ${btnClass || ''}`}
            >
              {loading && <ButtonLoader />}
              {btnText}
            </Button>

            {signInButton && (
              <div className="lg:hidden flex gap-1 justify-center items-center w-full py-3 px-5 text-sm border rounded-md bg-background">
                <Link href={pathname === '/signin' ? PATH.SIGNUP : PATH.SIGNIN}>
                  {pathname === '/signin' ? 'Sign Up' : 'Sign In'}
                </Link>
              </div>
            )}
          </div>
        )}
      </form>
    </Form>
  )
}
