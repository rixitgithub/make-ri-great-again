import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from '@/components/ui/hover-card';
  import { cn } from '@/lib/utils';
  
  export const RiHover = ({
    children,
    Content,
    side = 'left',
    contentClassName = '',
    sideOffset = 4,
  }) => {
    return (
      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger asChild>{children}</HoverCardTrigger>
        <HoverCardContent
          className={cn(
            `z-200 dark:text-white text-sm p-0 px-3 py-2 w-auto normal-case`,
            contentClassName
          )}
          side={side}
          sideOffset={sideOffset}
        >
          {Content}
        </HoverCardContent>
      </HoverCard>
    );
  };
  