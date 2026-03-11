'use client'

import { forwardRef, ReactNode } from 'react'
import { Info } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card'
import { RiHover } from '../RiHover/RiHover'

// move-interface
interface RiCardProps {
  header?: ReactNode
  title?: string
  description?: string
  children?: ReactNode
  className?: string
  headerClassName?: string
  contentClassName?: string
  showInfo?: boolean
  infoContent?: ReactNode
  onClick?: () => void
  overflow?: boolean
}

export const RiCard = forwardRef<HTMLDivElement, RiCardProps>(
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
    ref,
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
                  <div className="flex items-center gap-2">
                    {title && (
                      <CardTitle className="flex flex-1 text-xl lg:justify-center justify-start font-normal mb-5">
                        {title}
                      </CardTitle>
                    )}
                    {showInfo && (
                      <RiHover
                        trigger={<Info className="text-xl text-primary" />}
                        side="right"
                        contentClassName="w-104"
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
    )
  },
)

RiCard.displayName = 'RiCard'
