import React, { useState } from 'react';
// Note: In Vite, you might use React Router's <Link> or useNavigate hook here later
// import { useNavigate } from 'react-router-dom';

interface TopHeaderProps {
  userName?: string;
  avatarUrl?: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ 
  userName = "Vivek Ahirwar", 
  avatarUrl = "https://api.dicebear.com/7.x/notionists/svg?seed=Vivek&backgroundColor=e5e7eb" 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const navigate = useNavigate();

  return (
    <>
      {/* Header Container */}
      <header className="flex justify-between items-center mb-6 relative z-40">
        <div 
          className="flex items-center gap-inner-gap cursor-pointer active:scale-95 transition-transform"
          // onClick={() => navigate('/profile')} 
        >
          <div className="w-10 h-10 rounded-full bg-border overflow-hidden">
            <img src={avatarUrl} alt="User Profile" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xs text-text-muted font-medium">Welcome back</span>
            <span className="text-base font-bold text-text-primary">{userName}</span>
          </div>
        </div>

        <button 
          onClick={() => setIsMenuOpen(true)}
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-surface-hover transition-colors active:scale-95"
        >
          <iconify-icon icon="solar:hamburger-menu-linear" width="20" style={{ color: "var(--color-text-primary)" }}></iconify-icon>
        </button>
      </header>

      {/* Full-Screen Hamburger Modal */}
      {isMenuOpen && (
        <div className="absolute inset-0 z-50 bg-background-app/60 backdrop-blur-md flex flex-col p-4 animate-in fade-in duration-200">
          
          {/* Modal Header */}
          <div className="flex justify-between items-center mt-10 px-card-pad">
            <h2 className="font-display text-3xl font-bold text-text-inverse">Menu</h2>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-surface/20 flex items-center justify-center active:scale-95"
            >
              <iconify-icon icon="solar:close-circle-bold" width="24" style={{ color: "white" }}></iconify-icon>
            </button>
          </div>

          {/* Modal Links */}
          <div className="flex flex-col gap-inner-gap mt-8 px-card-pad">
            <button className="flex items-center gap-inner-gap bg-surface text-text-primary p-card-pad rounded-md font-bold text-lg active:scale-95 transition-transform">
              <iconify-icon icon="solar:bookmark-bold" width="24"></iconify-icon>
              Bookmarked MCQs
            </button>
            <button className="flex items-center gap-inner-gap bg-surface text-text-primary p-card-pad rounded-md font-bold text-lg active:scale-95 transition-transform">
              <iconify-icon icon="solar:chart-square-bold" width="24"></iconify-icon>
              Overall Progress
            </button>
            <button className="flex items-center gap-inner-gap bg-surface text-text-primary p-card-pad rounded-md font-bold text-lg active:scale-95 transition-transform">
              <iconify-icon icon="solar:settings-bold" width="24"></iconify-icon>
              App Settings
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TopHeader;