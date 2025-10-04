import React from 'react';
import { TitleLine } from './title-line';

interface HeaderWithTitleLineProps {
  children: React.ReactNode;
  className?: string;
  titleLineColor?: string;
  titleLineClassName?: string;
  animationDelay?: number;
}

export function HeaderWithTitleLine({ 
  children, 
  className = "", 
  titleLineColor = "#2563eb",
  titleLineClassName = "",
  animationDelay = 0.3
}: HeaderWithTitleLineProps) {
  return (
    <div className={`text-center relative ${className}`}>
      <div className="mb-0">
        {children}
      </div>
      
      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 translate-y-1/2">
        <TitleLine 
          color={titleLineColor} 
          className={titleLineClassName}
        />
      </div>
    </div>
  );
}
