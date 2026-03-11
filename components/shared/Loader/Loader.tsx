'use client';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

//move-interface
interface LoaderProps {
  className?: string;
  iconClassName?: string;
}

export const Loader = ({ className, iconClassName }: LoaderProps) => {
  return (
    <div
      className={cn(
        'flex h-screen w-screen items-center lg:h-full lg:w-full justify-center',
        className
      )}
    >
      <Loader2
        className={cn('w-16 h-16 text-primary animate-spin', iconClassName)}
      />
    </div>
  );
};