import React from 'react';

export const ZelligePattern: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none opacity-[0.07] ${className}`} style={{ backgroundSize: '60px 60px' }}>
      {/* 
        We use a repeating SVG pattern. 
        The geometry resembles a simplistic interpretation of an 8-fold rosette common in Zellige.
      */}
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="zelligeComplex" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
             <rect width="80" height="80" fill="none"/>
             
             {/* Central Star */}
             <path d="M40 10 L50 30 L70 40 L50 50 L40 70 L30 50 L10 40 L30 30 Z" fill="currentColor" opacity="0.6"/>
             
             {/* Corner connections */}
             <path d="M0 0 L20 20 M80 0 L60 20 M80 80 L60 60 M0 80 L20 60" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
             
             {/* Interlocking lines */}
             <rect x="35" y="35" width="10" height="10" transform="rotate(45 40 40)" stroke="currentColor" strokeWidth="2" fill="none"/>
             <circle cx="40" cy="40" r="3" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#zelligeComplex)" className="text-morocco-blue" />
      </svg>
    </div>
  );
};