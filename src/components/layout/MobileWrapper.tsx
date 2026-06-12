import React from 'react';

interface MobileWrapperProps {
  children: React.ReactNode;
}

const MobileWrapper: React.FC<MobileWrapperProps> = ({ children }) => {
  return (
    // Desktop Background
    <div className="min-h-screen w-full bg-background-desktop flex justify-center items-center font-sans">
      {/* Phone Simulator - using your specific sizing variables */}
      <div className="w-full max-w-[392px] h-[848px] p-layout-gap bg-background-app sm:rounded-app shadow-[0_8px_30px_rgb(0,0,0,0.15)] overflow-hidden flex flex-col relative">
        {children}
      </div>
    </div>
  );
};

export default MobileWrapper;