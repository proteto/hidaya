'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const PageLoader = () => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';

    setIsLoading(true);
    setIsVisible(true);

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    const visibilityTimer = setTimeout(() => {
      setIsVisible(false);  
      document.documentElement.style.overflow = 'auto';
    }, 1000);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(visibilityTimer);
      document.documentElement.style.overflow = 'auto';
    };
  }, [pathname]);

  if (!isVisible) return null;

  return (
    <div 
      className={`
        fixed inset-0 z-[9999] bg-gray-900 
        flex flex-col items-center justify-center 
        transition-all duration-500 ease-in-out
        ${isLoading ? 'opacity-100' : 'opacity-0'}
      `}>
      <p className='text-center text-green-500 font-extrabold uppercase text-3xl mb-4 '>hidaya </p>
      <div 
        className="h-3 rounded-full overflow-hidden w-96 bg-green-500 transform origin-left"
        style={{
          animation: 'loading-bar 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
          transformOrigin: 'left'
        }}
      />
      <style jsx global>{`
        @keyframes loading-bar {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        body { 
          overflow: hidden !important; 
        }
      `}</style>
    </div>
  );
};

export default PageLoader;
