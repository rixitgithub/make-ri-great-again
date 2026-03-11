'use client';

import { ReactNode, useEffect, useRef } from 'react';
import useOutsideAlerter from '@/hooks/useOutsiderAlerter';
import { cn } from '@/lib/utils';

// move-interface 
interface ModalWrapperProps {
  children: ReactNode;
  escActive?: boolean;
  handleClose?: () => void;
  shouldCloseOnClickOutside?: boolean;
  className?: string;
}

export const ModalWrapper = ({
  children,
  escActive = true,
  handleClose,
  shouldCloseOnClickOutside = false,
  className,
}: ModalWrapperProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const body = document.querySelector('body');

      body?.classList.add('overflow-hidden');

      return () => {
        body?.classList.remove('overflow-hidden');
      };
    }
  }, []);

  useEffect(() => {
    if (!escActive) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [escActive, handleClose]);

  useOutsideAlerter(modalRef, null, () => {
    if (shouldCloseOnClickOutside) {
      handleClose?.();
    }
  });

  return (
    <div className="fixed w-screen h-screen left-0 top-0 backdrop-blur z-200 overflow-hidden">
      <div className="flex w-screen h-screen justify-center items-center">
        <div
          ref={modalRef}
          className={cn(
            'flex w-full max-h-full p-5 justify-center overflow-auto',
            className
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};