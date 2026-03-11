import type { ReactNode } from 'react'
import { HEADER_TITLE } from '@/utils/constants/others/header'

export const metadata = {
  title: HEADER_TITLE.SIGNUP,
}

interface SignupLayoutProps {
  children: ReactNode
}

export default function layout({ children }: SignupLayoutProps) {
  return children
}
