import React from 'react';
import { useNavigate } from 'react-router';

const SubjectDetailScreen = () => {
  const navigate = useNavigate();

  const chapters = [
    { id: 1, title: 'Motion and Force', total: 45, wrong: 12, accuracy: 48, status: 'Weak' },
    { id: 2, title: 'Work, Energy, and Power', total: 30, wrong: 5, accuracy: 72, status: 'Improving' },
    { id: 3, title: 'Gravitation', total: 20, wrong: 1, accuracy: 95, status: 'Strong' },
    { id: 4, title: 'Sound Waves', total: 25, wrong: 0, accuracy: 0, status: 'Not Started' },
  ];

  return (
    <>
      {/* TOP SECTION: WHITE OVERLAY CARD */}
      <div className="bg-surface rounded-t-overlay rounded-b-sm px-card-pad pt-12 pb-6 z-10 flex flex-col relative shrink-0 shadow-sm">
        {/* Header with Back Button */}
        <header className="flex justify-between items-center mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-surface-hover transition-colors active:scale-95"
          >
             <iconify-icon icon="solar:arrow-left-linear" width="20" style={{ color: "var(--color-text-primary)" }}></iconify-icon>
          </button>
          
          <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-hover transition-colors active:scale-95">
             <iconify-icon icon="solar:menu-dots-bold" width="20" style={{ color: "var(--color-text-primary)" }}></iconify-icon>
          </button>
        </header>

        {/* Subject Title and Stats */}
        <div className="mb-2 mt-2">
          <span className="text-sm font-bold text-text-muted mb-1 block">Science</span>
          <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary leading-none">
            Physics
          </h1>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-text-primary">68%</span>
            <span className="text-xs font-semibold text-text-muted">Accuracy</span>
          </div>
          <div className="w-px h-8 bg-border"></div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-text-primary">2/14</span>
            <span className="text-xs font-semibold text-text-muted">Chapters Completed</span>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: DARK BACKGROUND */}
      <main className="flex-1 overflow-y-auto pt-4 pb-24 flex flex-col gap-layout-gap scrollbar-hide px-card-pad">
        
        {/* Sorting Label */}
        <div className="flex items-center gap-2 mb-2 opacity-60">
          <iconify-icon icon="solar:sort-from-bottom-to-top-linear" width="16" style={{ color: "var(--color-text-inverse)" }}></iconify-icon>
          <span className="text-xs font-bold text-text-inverse">Automatically ordered by weak areas</span>
        </div>

        {/* Chapter List */}
        <div className="flex flex-col gap-inner-gap">
          {chapters.map((chapter) => (
            <div 
              key={chapter.id} 
              onClick={() => navigate(`/chapter/${chapter.id}`)}
              className="bg-surface rounded-sm p-card-pad flex justify-between items-center shadow-sm cursor-pointer active:scale-95 transition-transform"
            >
              <div className="flex flex-col gap-1 w-full pr-4">
                <span className="text-base font-bold text-text-primary leading-tight">{chapter.title}</span>
                
                <div className="flex items-center gap-3 mt-1">
                  {/* Status Badge */}
                  <div className={`px-2 py-1 rounded-sm text-xxs font-bold ${
                    chapter.status === 'Weak' ? 'bg-widget-sleep-bg/40 text-widget-sleep-chart' : 
                    chapter.status === 'Improving' ? 'bg-widget-stress-bg/40 text-widget-stress-chart' :
                    chapter.status === 'Strong' ? 'bg-widget-quiz-bg/60 text-[#0f5132]' :
                    'bg-surface-hover text-text-muted'
                  }`}>
                    {chapter.status}
                  </div>
                  
                  {/* Wrong Count Badge */}
                  {chapter.wrong > 0 && (
                     <div className="flex items-center gap-1 text-widget-sleep-chart text-xs font-bold bg-widget-sleep-bg/20 px-2 py-1 rounded-sm">
                        <iconify-icon icon="solar:close-circle-bold" width="12"></iconify-icon>
                        {chapter.wrong} Wrong
                     </div>
                  )}
                </div>

                {/* Accuracy Progress Bar if attempted */}
                {chapter.total > 0 && chapter.accuracy > 0 && (
                   <div className="w-full flex items-center gap-2 mt-2 opacity-80">
                     <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                       <div className="h-full bg-text-primary rounded-full" style={{ width: `${chapter.accuracy}%` }}></div>
                     </div>
                     <span className="text-xxs font-bold text-text-muted">{chapter.accuracy}%</span>
                   </div>
                )}
              </div>
              
              <div className="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center shrink-0">
                <iconify-icon icon="solar:alt-arrow-right-linear" width="20" style={{ color: "var(--color-text-primary)" }}></iconify-icon>
              </div>
            </div>
          ))}
        </div>

      </main>
    </>
  );
};

export default SubjectDetailScreen;
