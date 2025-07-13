import React, { useState, useRef, useEffect } from 'react';

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = null,
  fallback = null,
  loading = 'lazy',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const currentRef = imgRef.current;
    
    // Use Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isInView) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px' // Start loading 50px before the image enters viewport
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  // Default placeholder
  const defaultPlaceholder = (
    <div className={`bg-gray-200 animate-pulse flex items-center justify-center ${className}`}>
      <svg
        className="w-6 h-6 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>
  );

  // Default fallback for errors
  const defaultFallback = (
    <div className={`bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center ${className}`}>
      <svg
        className="w-6 h-6 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  );

  return (
    <div ref={imgRef} className="relative">
      {!isInView && (placeholder || defaultPlaceholder)}
      
      {isInView && (
        <>
          {!isLoaded && !hasError && (placeholder || defaultPlaceholder)}
          
          {hasError ? (
            fallback || defaultFallback
          ) : (
            <img
              src={src}
              alt={alt}
              className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
              loading={loading}
              onLoad={handleLoad}
              onError={handleError}
              {...props}
            />
          )}
        </>
      )}
    </div>
  );
};

export default LazyImage;