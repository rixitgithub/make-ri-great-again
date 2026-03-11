'use client'

import { Logo } from '@/components/Icon/Logo/logo'

interface AuthLogoProps {
  size?: number
  className?: string
}

export const AuthLogo = ({ size = 40, className }: AuthLogoProps) => {
  return (
    <div className={`flex gap-2 md:gap-3 items-center ${className || 'mb-8'}`}>
      <Logo width={size} height={size} theme="dark" />
      <h1 className="text-lg md:text-2xl font-semibold tracking-tight text-white uppercase">
        ReachInbox
      </h1>
    </div>
  )
}
