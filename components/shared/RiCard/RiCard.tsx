'use client';

import { RiHover } from '@/components/shared/RiHover/RiHover';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { forwardRef } from 'react';
import { IoMdInformationCircle } from 'react-icons/io';

export const RiCard = forwardRef(
  (
    {
      header,
      title,
      description,
      children,
      className,
      headerClassName,
      contentClassName,
      showInfo,
      infoContent,
      onClick = () => {},
      overflow = true,
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        className={`flex flex-col w-full shadow-lg border rounded-lg lg:p-7 py-7 px-3 whitespace-pre-wrap ${
          overflow ? 'overflow-auto' : ''
        } no-scrollbar ${className}`}
        onClick={onClick}
      >
        <CardHeader className={`p-0 ${headerClassName}`}>
          {header
            ? header
            : title && (
                <>
                  <div className='flex items-center gap-2'>
                    {title && (
                      <CardTitle className='flex flex-1 text-xl lg:justify-center justify-start font-normal mb-5'>
                        {title}
                      </CardTitle>
                    )}
                    {showInfo && (
                      <RiHover
                        trigger={
                          <IoMdInformationCircle className='text-xl text-primary' />
                        }
                        side='right'
                        contentClassName='w-[26rem]'
                      >
                        {infoContent}
                      </RiHover>
                    )}
                  </div>
                  <CardDescription>{description}</CardDescription>
                </>
              )}
        </CardHeader>
        <CardContent className={`${contentClassName}`}>{children}</CardContent>
      </Card>
    );
  }
);

RiCard.displayName = 'RiCard';
