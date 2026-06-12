import React from 'react';

// Strict typing prevents passing random strings to your activeTab
export type TabType = 'home' | 'sleep' | 'calendar' | 'widgets';

interface BottomNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-40">
      <nav className="h-[76px] bg-background-app/80 backdrop-blur-lg border border-white/10 rounded-2xl flex justify-around items-center px-card-pad pb-2 pt-2 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)]">
        
        {/* HOME TAB */}
        <button 
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center gap-layout-gap active:scale-95 transition-transform relative ${activeTab === 'home' ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
        >
          {activeTab === 'home' ? (
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center -mt-2 shadow-xl border border-white/20">
              <iconify-icon icon="solar:home-smile-bold" width="24" style={{ color: "black" }}></iconify-icon>
            </div>
          ) : (
            <iconify-icon icon="solar:home-smile-linear" width="24" style={{ color: "white" }}></iconify-icon>
          )}
        </button>

        {/* SLEEP TAB */}
        <button 
          onClick={() => onTabChange('sleep')}
          className={`flex flex-col items-center gap-layout-gap active:scale-95 transition-transform relative ${activeTab === 'sleep' ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
        >
          {activeTab === 'sleep' ? (
             <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center -mt-2 shadow-xl border border-white/20">
               <iconify-icon icon="solar:moon-bold" width="24" style={{ color: "black" }}></iconify-icon>
             </div>
          ) : (
            <iconify-icon icon="solar:moon-linear" width="24" style={{ color: "white" }}></iconify-icon>
          )}
        </button>

        {/* CALENDAR TAB */}
        <button 
          onClick={() => onTabChange('calendar')}
          className={`flex flex-col items-center gap-layout-gap active:scale-95 transition-transform relative ${activeTab === 'calendar' ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
        >
          {activeTab === 'calendar' ? (
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center -mt-2 shadow-xl border border-white/20">
              <iconify-icon icon="solar:calendar-bold" width="24" style={{ color: "black" }}></iconify-icon>
            </div>
          ) : (
             <iconify-icon icon="solar:calendar-linear" width="24" style={{ color: "white" }}></iconify-icon>
          )}
        </button>

        {/* WIDGET TAB */}
        <button 
          onClick={() => onTabChange('widgets')}
          className={`flex flex-col items-center gap-layout-gap active:scale-95 transition-transform relative ${activeTab === 'widgets' ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
        >
          {activeTab === 'widgets' ? (
             <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center -mt-2 shadow-xl border border-white/20">
               <iconify-icon icon="solar:widget-5-bold" width="24" style={{ color: "black" }}></iconify-icon>
             </div>
          ) : (
            <iconify-icon icon="solar:widget-linear" width="24" style={{ color: "white" }}></iconify-icon>
          )}
        </button>
        
      </nav>
    </div>
  );
};

export default BottomNavigation;