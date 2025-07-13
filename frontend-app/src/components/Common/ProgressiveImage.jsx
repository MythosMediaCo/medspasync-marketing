import React, { useState, useEffect } from 'react';
import LazyImage from './LazyImage.jsx';

/**
 * Progressive Image Component with WebP support and responsive loading
 * Automatically serves optimized formats based on browser support
 */
const ProgressiveImage = ({ 
  src, 
  alt, 
  className = '',
  sizes = null,
  srcSet = null,
  lowQualitySrc = null,
  webpSrc = null,
  avifSrc = null,
  ...props 
}) => {
  const [supportsWebP, setSupportsWebP] = useState(false);
  const [supportsAvif, setSupportsAvif] = useState(false);

  useEffect(() => {
    // Check WebP support
    const webpTest = new Image();
    webpTest.onload = () => setSupportsWebP(true);
    webpTest.onerror = () => setSupportsWebP(false);
    webpTest.src = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';

    // Check AVIF support
    const avifTest = new Image();
    avifTest.onload = () => setSupportsAvif(true);
    avifTest.onerror = () => setSupportsAvif(false);
    avifTest.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  }, []);

  // Determine the best source format
  const getBestSource = () => {
    if (supportsAvif && avifSrc) return avifSrc;
    if (supportsWebP && webpSrc) return webpSrc;
    return src;
  };

  // Generate srcSet for responsive images
  const getResponsiveSrcSet = () => {
    if (srcSet) return srcSet;
    
    // Auto-generate srcSet for common image sizes
    const baseSrc = getBestSource();
    if (!baseSrc) return null;
    
    const extension = baseSrc.split('.').pop();
    const baseName = baseSrc.replace(`.${extension}`, '');
    
    // Common responsive sizes
    return [
      `${baseName}_400w.${extension} 400w`,
      `${baseName}_800w.${extension} 800w`,
      `${baseName}_1200w.${extension} 1200w`,
      `${baseName}_1600w.${extension} 1600w`
    ].join(', ');
  };

  const optimizedSrc = getBestSource();
  const optimizedSrcSet = getResponsiveSrcSet();

  return (
    <LazyImage
      src={optimizedSrc}
      srcSet={optimizedSrcSet}
      sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
      alt={alt}
      className={className}
      placeholder={
        lowQualitySrc ? (
          <img 
            src={lowQualitySrc} 
            alt={alt}
            className={`${className} blur-sm scale-110 transition-all duration-500`}
          />
        ) : null
      }
      {...props}
    />
  );
};

export default ProgressiveImage;