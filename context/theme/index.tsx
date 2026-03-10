'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemePropsInterface } from '@/@types/context/theme-context.types'

export const ThemeProvider: React.FC<ThemePropsInterface> = ({
  children,
  ...props
}) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
