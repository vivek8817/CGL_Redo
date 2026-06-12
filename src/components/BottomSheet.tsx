import { useEffect, useState } from 'react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, title, children }) => {
  const [render, setRender] = useState(isOpen);

  // Handle animation lifecycle
  useEffect(() => {
    if (isOpen) setRender(true);
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) setRender(false);
  };

  if (!render) return null;

  return (
    <div className="absolute inset-0 z-[60] overflow-hidden flex flex-col justify-end">
 {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      
      {/* Sheet Content */}
      <div 
        className={`relative bg-surface rounded-t-overlay w-full flex flex-col transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
        onTransitionEnd={handleAnimationEnd}
        style={{ maxHeight: '90%' }}
      >
        {/* Handle bar */}
        <div className="w-full flex justify-center pt-3 pb-2 shrink-0">
          <div className="w-12 h-1.5 bg-border rounded-full" />
        </div>

        {/* Header */}
        <div className="px-card-pad pb-4 flex justify-between items-center shrink-0">
          <h2 className="text-xl font-bold text-text-primary">{title}</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center active:scale-95 transition-transform"
          >
            <iconify-icon icon="solar:close-circle-linear" width="20" style={{ color: "var(--color-text-primary)" }}></iconify-icon>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-card-pad pb-layout-gap scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
