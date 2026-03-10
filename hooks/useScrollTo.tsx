import { useRef } from 'react';

export const useScrollTo = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollToSelectedCard = (id: string) => {
    if (!containerRef.current) return;

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return {
    containerRef,
    scrollToSelectedCard,
  };
};
