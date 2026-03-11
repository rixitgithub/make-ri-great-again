import type { ReactNode } from 'react'
import { HEADER_TITLE } from '@/utils/constants/others/header'

export const metadata = {
  title: HEADER_TITLE.VERIFY_EMAIL,
}

interface VerifyEmailLayoutProps {
  children: ReactNode
}

export default function layout({ children }: VerifyEmailLayoutProps) {
  return children
}
