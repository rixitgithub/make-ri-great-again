'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FC } from 'react';

//move-interface
interface RiAvatarProps {
  src?: string;
  fallbackText?: string;
  fallbackClassName?: string;
  className?: string;
}

export const RiAvatar: FC<RiAvatarProps> = ({
  src,
  fallbackText,
  fallbackClassName = '',
  className = '',
}) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} />
      <AvatarFallback
        className={`dark:bg-gradient-to-r dark:from-[#4B63DD] dark:to-[#0524BFFC] bg-gradient-to-r from-blue-500 to-blue-600 text-white ${fallbackClassName}`}
      >
        {fallbackText}
      </AvatarFallback>
    </Avatar>
  );
};