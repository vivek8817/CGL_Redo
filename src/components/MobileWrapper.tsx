import React from 'react';

interface FaceProps {
  className?: string;
  size?: number | string;
}

export const MobileWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    // Desktop Background
    <div className="min-h-screen w-full bg-background-desktop flex justify-center items-center font-sans">
      {/* Phone Simulator */}
      <div className="w-full max-w-mobile-w h-mobile-h p-layout-gap bg-background-app sm:rounded-app shadow-[0_8px_30px_rgb(0,0,0,0.15)] overflow-hidden flex flex-col relative">
        
        {children} {/* Your screens will render here */}
        
      </div>
    </div>
  );
};

export default MobileWrapper;
