'use client';

import { ThemePropsInterface } from '@/@types/context/theme-context.types';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export const ThemeProvider: React.FC<ThemePropsInterface> = ({
  children,
  ...props
}) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};
