"use client";

import React from 'react';

type LogoProps = {
  className?: string;
  variant?: 'wordmark' | 'monogram' | 'lockup';
  color?: 'current' | 'charcoal' | 'offwhite' | 'burnt-orange';
};

export function Logo({ className = '', variant = 'wordmark', color = 'current' }: LogoProps) {
  const colorMap = {
    'current': 'currentColor',
    'charcoal': 'var(--color-charcoal)',
    'offwhite': 'var(--color-offwhite)',
    'burnt-orange': 'var(--color-burnt-orange)',
  };
  const fill = colorMap[color];

  // Font setup matches the brand guidelines: PP Neue Montreal as primary, falling back to Inter.
  const fontStyle = {
    fontFamily: "'PP Neue Montreal', 'Inter', system-ui, sans-serif",
  };

  /**
   * The dimensions and coordinates are fine-tuned to recreate the exact composition
   * of the UrbanStyle logo as defined in the brand guidelines v1.1.
   * We use SVG text elements here so they render perfectly crisp across all devices
   * and respect the CSS variables.
   */

  if (variant === 'monogram') {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <text 
          x="50%" 
          y="50%" 
          dy="0.05em"
          dominantBaseline="central" 
          textAnchor="middle" 
          fill={fill}
          style={{ 
            ...fontStyle,
            fontWeight: 800, 
            fontSize: '90px',
            letterSpacing: '-0.06em'
          }}
        >
          US
        </text>
      </svg>
    );
  }

  if (variant === 'wordmark') {
    return (
      <svg viewBox="0 0 350 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
         <text 
          x="0" 
          y="50%" 
          dy="0.05em"
          dominantBaseline="central" 
          fill={fill}
          style={{ 
            ...fontStyle,
            fontWeight: 700, 
            fontSize: '72px',
            letterSpacing: '-0.05em'
          }}
        >
          UrbanStyle
        </text>
      </svg>
    );
  }

  // default: lockup
  return (
    <svg viewBox="0 0 490 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <text 
        x="0" 
        y="50%" 
        dy="0.05em"
        dominantBaseline="central" 
        fill={fill}
        style={{ 
          ...fontStyle,
          fontWeight: 700, 
          fontSize: '72px',
          letterSpacing: '-0.05em'
        }}
      >
        UrbanStyle
      </text>
      <text 
        x="365" 
        y="50%" 
        dy="0.05em"
        dominantBaseline="central" 
        fill={fill}
        style={{ 
          ...fontStyle,
          fontWeight: 800, 
          fontSize: '72px',
          letterSpacing: '-0.06em'
        }}
      >
        US
      </text>
    </svg>
  );
}
