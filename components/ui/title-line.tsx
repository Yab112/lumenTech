import React from 'react';

interface TitleLineProps {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
}

export function TitleLine({ 
  className = "", 
  color = "#2DB382", 
  width = 478, 
  height = 39 
}: TitleLineProps) {
  return (
    <div className={`flex justify-center ${className}`}>
             <svg 
         width="100%" 
         height="auto" 
         viewBox="0 0 478 39" 
         fill="none" 
         xmlns="http://www.w3.org/2000/svg"
         className="w-full max-w-[200px] sm:max-w-xs md:max-w-sm text-blue-600"
         preserveAspectRatio="xMidYMid meet"
       >
        <path 
          d="M2 17.4998C71.6307 -2.12043 259.914 -10.0887 476 36.9998" 
          stroke={color} 
          strokeWidth="3" 
          strokeLinecap="round"
          className="transition-colors duration-300 sm:stroke-[4]"
        />
      </svg>
    </div>
  );
}
