'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'

export const AnimatedTestimonials = ({
  testimonials = [],
  autoplay = true,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!autoplay || testimonials.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay, testimonials.length])

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    )
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  if (!testimonials || testimonials.length === 0) {
    return null
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div
      className={cn('flex flex-col w-full mx-auto relative z-10', className)}
    >
      {/* Testimonial Card */}
      <div
        className="bg-[#121212]/80 rounded-[24px] p-2 md:p-4 relative overflow-hidden transition-all duration-500"
        style={{
          backdropFilter: 'blur(124.7px)',
          WebkitBackdropFilter: 'blur(124.7px)',
        }}
      >
        {/* Quote Icon */}
        <div className="mb-6">
          <Quote className="text-[34px] md:text-[38px] text-white scale-x-[-1]" />
        </div>

        {/* Testimonial Quote */}
        <div className="mb-10">
          <p className="text-xs md:text-base text-white/90 leading-relaxed font-light line-clamp-6">
            {currentTestimonial.quote}
          </p>
        </div>

        {/* Author Info */}
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
            {testimonials.map((testimonial, index) => (
              <Image
                key={testimonial.src}
                src={testimonial.src}
                alt={testimonial.name}
                fill
                className={cn(
                  'object-cover transition-opacity duration-300',
                  index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0',
                )}
                sizes="48px"
                priority={true}
              />
            ))}
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-sm text-white">
              {currentTestimonial.name}
            </p>
            {currentTestimonial.designation && (
              <p className="text-xs text-white/50">
                {currentTestimonial.designation}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-8 w-full px-2">
        {/* Dots Indicator */}
        {testimonials.length > 1 && (
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  index === currentIndex
                    ? 'bg-white w-8'
                    : 'bg-white/20 hover:bg-white/40 w-2',
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Navigation Arrows */}
        {testimonials.length > 1 && (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={goToPrevious}
              className="p-3 rounded-[12px] bg-[#121212]/80 text-white transition-all active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="p-3 rounded-[12px] bg-[#121212]/80 text-white transition-all active:scale-95"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
