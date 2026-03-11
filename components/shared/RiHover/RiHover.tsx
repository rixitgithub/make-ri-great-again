'use client';

import { ReactNode } from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';

// move-interface 
type HoverCardSide = React.ComponentProps<typeof HoverCardContent>['side'];

// move-interface 
interface RiHoverProps {
  trigger: ReactNode;
  children: ReactNode;
  side?: HoverCardSide;
  contentClassName?: string;
  sideOffset?: number;
}

export const RiHover = ({
  trigger,
  children,
  side = 'left',
  contentClassName = '',
  sideOffset = 4,
}: RiHoverProps) => {
  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger asChild>{trigger}</HoverCardTrigger>

      <HoverCardContent
        className={cn(
          'z-200 dark:text-white text-sm p-0 px-3 py-2 w-auto normal-case',
          contentClassName
        )}
        side={side}
        sideOffset={sideOffset}
      >
        {children}
      </HoverCardContent>
    </HoverCard>
  );
};