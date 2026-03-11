'use client';

import { useEffect, useState } from 'react';
import { SideCard } from '.';

export const Wrapper = ({ children, showLeftSide = true }) => {
  const [showSidebar, setShowSidebar] = useState(showLeftSide);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const host = window.location.hostname;

      if (host !== process.env.NEXT_PUBLIC_HOSTNAME) {
        setShowSidebar(false);
      }
    }
  }, []);

  return (
    <div className='flex flex-1 gap-5 justify-center'>
      {showSidebar && (
        <div className='flex flex-1 justify-center items-center max-w-lg mx-10 max-sm:hidden'>
          <SideCard />
        </div>
      )}
      <div className='flex flex-1 justify-center items-center max-w-2xl max-sm:mx-2 mx-10'>
        {children}
      </div>
    </div>
  );
};
