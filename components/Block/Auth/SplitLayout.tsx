'use client'

import { type ReactNode } from 'react'
import { AnimatedTestimonials } from '@/components/shared'
import { AuthLogo } from '@/components/shared/AuthLogo/AuthLogo'
import useWindowSize from '@/hooks/useWindowSize'
import { cn } from '@/lib/utils'
import { AUTH_TESTIMONIALS } from '@/utils/constants/auth/testimonials'

//move-interface
interface SplitLayoutProps {
  children: ReactNode
  leftContentClassName?: string
  containerClassName?: string
  showLogo?: boolean
  logoPosition?: 'center' | 'top-left'
  showTestimonials?: boolean
  headerRight?: ReactNode
  centerContent?: boolean
}

export const SplitLayout = ({
  children,
  leftContentClassName,
  containerClassName,
  showLogo = true,
  logoPosition = 'center',
  showTestimonials = true,
  headerRight,
  centerContent = false,
}: SplitLayoutProps) => {
  const isMobile = useWindowSize()

  return (
    <>
      <style jsx global>{`
        .onboarding-container {
          overflow-y: ${isMobile ? 'auto' : 'scroll'};
        }
      `}</style>
      <div className="onboarding-container w-full h-screen max-h-screen flex relative z-0">
        <div
          className={cn(
            'flex-1 flex flex-col bg-[#0a0a0a] backdrop-blur-sm h-full relative p-4 md:p-8 pt-8 md:pt-12 z-[1]',
            centerContent && 'justify-center',
            containerClassName,
          )}
        >
          {showLogo && (
            <div
              className={cn(
                'w-full flex flex-wrap items-center justify-between gap-y-4 shrink-0',
                logoPosition === 'top-left'
                  ? 'mb-6 md:mb-12'
                  : 'justify-center mb-6',
              )}
            >
              <AuthLogo
                size={
                  logoPosition === 'top-left'
                    ? isMobile
                      ? 24
                      : 32
                    : isMobile
                      ? 32
                      : 40
                }
                className={cn(
                  'mb-0',
                  logoPosition === 'top-left'
                    ? 'text-lg md:text-xl'
                    : 'text-lg md:text-2xl',
                )}
              />
              {logoPosition === 'top-left' && headerRight}
            </div>
          )}
          <div
            className={cn(
              'w-full flex flex-col gap-6 mx-auto min-h-0',
              !centerContent && 'flex-1',
              leftContentClassName ||
                'max-w-[440px] items-center justify-center',
            )}
          >
            {children}
          </div>
        </div>

        {/* Right Column - Testimonials */}
        {!isMobile && showTestimonials && (
          <div
            className={cn(
              'hidden lg:flex flex-col items-center',
              'relative z-[1]',
              'lg:w-[40%] xl:w-[35%] h-screen max-h-screen',
              'p-8 md:p-12',
              'overflow-hidden',
              'sticky top-0 self-start',
            )}
          >
            {/* Background */}
            <div className="absolute inset-0 z-0 bg-[#080808] overflow-hidden">
              <div
                className="absolute top-[-35%] left-[-50%] right-[-50%] h-[75%] opacity-100"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 45%, #9EA1FF 0%, #6F72FF 20%, #4A59E5 40%, #243FCB 70%, transparent 100%)',
                }}
              />

              <div
                className="absolute inset-0"
                style={{
                  backdropFilter: 'blur(124.7px)',
                  WebkitBackdropFilter: 'blur(124.7px)',
                }}
              />

              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100M100 0v100' stroke='white' stroke-width='1' stroke-dasharray='3,3' fill='none' opacity='0.5'/%3E%3C/svg%3E")`,
                  scale: '1',
                  maskImage:
                    'linear-gradient(to bottom, black 30%, transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, black 30%, transparent 100%)',
                }}
              />
            </div>

            {/* Testimonials in the middle - scrollable if content exceeds screen height */}
            <div className="w-full flex items-center justify-center relative z-10 flex-1 min-h-0 overflow-y-auto custom-scrollbar">
              <AnimatedTestimonials
                testimonials={AUTH_TESTIMONIALS}
                autoplay={true}
                className="w-full"
              />
            </div>

            {/* Fixed Footer at the bottom */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20 pointer-events-none">
              <div className="pointer-events-auto">
                <p className="text-xs text-gray-500/60 font-light">
                  &copy; {new Date().getFullYear()} ReachInbox. All rights
                  reserved.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
