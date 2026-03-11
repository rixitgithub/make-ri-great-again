import { forwardRef, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ModalWrapper } from '../Modal/ModalWrapper'
import { RiCard } from '../RiCard/RiCard'

interface PopupProps {
  children: ReactNode
  handleClose: () => void
  title?: ReactNode
  icon?: ReactNode
  className?: string
  headerClassName?: string
  closeRequired?: boolean
  wrapperClassName?: string
  closeButtonClassName?: string
}

export const Popup = forwardRef<HTMLDivElement, PopupProps>(
  (
    {
      children,
      handleClose,
      title,
      icon,
      className = '',
      headerClassName,
      closeRequired = true,
      wrapperClassName,
      closeButtonClassName,
    },
    ref,
  ) => {
    return (
      <ModalWrapper handleClose={handleClose} className={wrapperClassName}>
        <RiCard
          className={cn(`max-w-[450px]`, className)}
          header={
            <div
              className={cn(
                `flex justify-between items-center mb-10 ${headerClassName}`,
              )}
            >
              <div className="flex items-center gap-2">
                {icon}
                <h1 className="text-xl font-semibold">{title}</h1>
              </div>
              {closeRequired && (
                <div
                  className={cn('cursor-pointer z-10', closeButtonClassName)}
                  onClick={handleClose}
                >
                  <X />
                </div>
              )}
            </div>
          }
          ref={ref}
        >
          {children}
        </RiCard>
      </ModalWrapper>
    )
  },
)

Popup.displayName = 'Popup'
