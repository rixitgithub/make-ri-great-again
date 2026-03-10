import { useEffect, useState } from 'react';

const useWindowSize = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

export default useWindowSize;
