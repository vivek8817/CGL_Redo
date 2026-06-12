import React from 'react';
import { useNavigate } from 'react-router';
import { HappyExpression, AngryExpression } from '../components/Faces';

const ChapterOverviewScreen = () => {
  const navigate = useNavigate();

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

        {/* Breadcrumb & Title */}
        <div className="mb-2">
          <div className="flex items-center gap-1 text-xs font-bold text-text-muted mb-1 opacity-80">
            <span>Science</span>
            <iconify-icon icon="solar:alt-arrow-right-linear" width="12"></iconify-icon>
            <span>Physics</span>
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary leading-none">
            Motion and Force
          </h1>
        </div>

        {/* High-Level Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mt-6">
          <div className="flex flex-col bg-surface-hover rounded-sm p-3 border border-border/50">
            <iconify-icon icon="solar:document-text-bold" width="16" style={{ color: "var(--color-text-muted)" }} className="mb-1"></iconify-icon>
            <span className="text-xl font-bold text-text-primary">45</span>
            <span className="text-xxs font-bold text-text-muted uppercase tracking-wider">Total MCQs</span>
          </div>
          <div className="flex flex-col bg-surface-hover rounded-sm p-3 border border-border/50">
            <iconify-icon icon="solar:check-circle-bold" width="16" style={{ color: "var(--color-text-muted)" }} className="mb-1"></iconify-icon>
            <span className="text-xl font-bold text-text-primary">32</span>
            <span className="text-xxs font-bold text-text-muted uppercase tracking-wider">Attempted</span>
          </div>
          <div className="flex flex-col bg-widget-sleep-bg/20 rounded-sm p-3 border border-widget-sleep-chart/20">
            <iconify-icon icon="solar:close-circle-bold" width="16" className="mb-1 text-widget-sleep-chart"></iconify-icon>
            <span className="text-xl font-bold text-widget-sleep-chart">12</span>
            <span className="text-xxs font-bold text-widget-sleep-chart uppercase tracking-wider">Wrong</span>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: ACTION WIDGETS */}
      <main className="flex-1 overflow-y-auto pt-2 pb-24 flex flex-col gap-layout-gap scrollbar-hide px-card-pad">
        
        {/* Start Full Chapter - Green Widget */}
        <div 
          onClick={() => navigate('/mcq')}
          className="bg-widget-quiz-bg rounded-sm p-card-pad   flex flex-col h-[140px] justify-between relative cursor-pointer active:scale-95 transition-transform overflow-hidden shadow-sm"
        >
          <HappyExpression className="absolute -bottom-8 -right-14 opacity-90 rotate-[-15deg] w-40 h-40" />
          
          <div className="flex items-center justify-between z-10">
            <div className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center">
              <iconify-icon icon="solar:play-circle-bold" width="24" style={{ color: "var(--color-text-primary)" }}></iconify-icon>
            </div>
            <span className="text-xs font-bold text-text-primary opacity-90">General Practice</span>
          </div>
          
          <div className="flex flex-col z-10">
            <span className="text-2xl font-bold text-text-primary leading-tight">Start Full Chapter</span>
            <span className="text-xs font-bold text-text-primary opacity-80 mt-1">Practice all 45 questions</span>
          </div>
        </div>

        {/* Revise Wrong Only - Purple Widget */}
        <div 
          onClick={() => navigate('/mcq')}
          className="bg-widget-stress-bg rounded-sm p-card-pad flex flex-col h-[140px] justify-between relative cursor-pointer active:scale-95 transition-transform overflow-hidden shadow-sm"
        >
           <AngryExpression className="absolute -top-4 -right-12 opacity-90 rotate-12 w-40 h-40" />

          <div className="flex items-center justify-between z-10">
             <div className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center">
              <iconify-icon icon="solar:refresh-circle-bold" width="24" style={{ color: "var(--color-text-primary)" }}></iconify-icon>
            </div>
            <span className="text-xs font-bold text-text-primary opacity-90">Targeted Revision</span>
          </div>
          
          <div className="flex flex-col z-10">
            <span className="text-2xl font-bold text-text-primary leading-tight">Revise Wrong Only</span>
            <span className="text-xs font-bold text-text-primary opacity-80 mt-1">Focus on the 12 you missed</span>
          </div>
        </div>

        {/* Revise Bookmarks - Yellow Widget */}
        <div 
          onClick={() => navigate('/mcq')}
          className="bg-widget-sleep-bg rounded-sm p-card-pad flex flex-col h-[140px] justify-between relative cursor-pointer active:scale-95 transition-transform overflow-hidden shadow-sm"
        >
          <div className="flex items-center justify-between z-10">
            <div className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center">
              <iconify-icon icon="solar:bookmark-circle-bold" width="24" style={{ color: "var(--color-text-primary)" }}></iconify-icon>
            </div>
            <span className="text-xs font-bold text-text-primary opacity-90">Saved Items</span>
          </div>
          
          <div className="flex flex-col z-10">
            <span className="text-2xl font-bold text-text-primary leading-tight">Revise Bookmarks</span>
            <span className="text-xs font-bold text-text-primary opacity-80 mt-1">Review 5 saved questions</span>
          </div>
        </div>

      </main>
    </>
  );
};

export default ChapterOverviewScreen;
