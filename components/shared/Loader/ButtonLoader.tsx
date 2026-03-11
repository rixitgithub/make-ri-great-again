'use client';

import { Loader2 } from 'lucide-react';

//move-interface
interface ButtonLoaderProps {
  className?: string;
}

export const ButtonLoader = ({ className = '' }: ButtonLoaderProps) => {
  return <Loader2 className={`mr-1 w-6 h-6 animate-spin ${className}`} />;
};