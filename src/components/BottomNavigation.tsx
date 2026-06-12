import { useLocation, useNavigate } from 'react-router';

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const activeTab = location.pathname;

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-50">
      <nav className="h-[76px] bg-background-app/80 backdrop-blur-lg border border-white/10 rounded-2xl flex justify-around items-center px-card-pad pb-2 pt-2 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)]">
        
        {/* HOME TAB */}
        <button 
          onClick={() => navigate('/')}
          className={`flex flex-col items-center gap-layout-gap active:scale-95 transition-transform relative ${activeTab === '/' ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
        >
          {activeTab === '/' ? (
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center -mt-2 shadow-xl border border-white/20">
              <iconify-icon icon="solar:home-smile-bold" width="24" style={{ color: "black" }}></iconify-icon>
            </div>
          ) : (
            <iconify-icon icon="solar:home-smile-linear" width="24" style={{ color: "white" }}></iconify-icon>
          )}
        </button>

        {/* BOOKMARKS TAB */}
        <button 
          onClick={() => navigate('/bookmarks')}
          className={`flex flex-col items-center gap-layout-gap active:scale-95 transition-transform relative ${activeTab === '/bookmarks' ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
        >
          {activeTab === '/bookmarks' ? (
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center -mt-2 shadow-xl border border-white/20">
              <iconify-icon icon="solar:bookmark-bold" width="24" style={{ color: "black" }}></iconify-icon>
            </div>
          ) : (
             <iconify-icon icon="solar:bookmark-linear" width="24" style={{ color: "white" }}></iconify-icon>
          )}
        </button>

        {/* CALENDAR TAB */}
        <button 
          onClick={() => navigate('/calendar')}
          className={`flex flex-col items-center gap-layout-gap active:scale-95 transition-transform relative ${activeTab === '/calendar' ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
        >
          {activeTab === '/calendar' ? (
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center -mt-2 shadow-xl border border-white/20">
              <iconify-icon icon="solar:calendar-bold" width="24" style={{ color: "black" }}></iconify-icon>
            </div>
          ) : (
             <iconify-icon icon="solar:calendar-linear" width="24" style={{ color: "white" }}></iconify-icon>
          )}
        </button>

        {/* SUBJECTS / WIDGETS TAB */}
        <button 
          onClick={() => navigate('/subjects')}
          className={`flex flex-col items-center gap-layout-gap active:scale-95 transition-transform relative ${activeTab === '/subjects' ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
        >
          {activeTab === '/subjects' ? (
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center -mt-2 shadow-xl border border-white/20">
              <iconify-icon icon="solar:widget-bold" width="24" style={{ color: "black" }}></iconify-icon>
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
