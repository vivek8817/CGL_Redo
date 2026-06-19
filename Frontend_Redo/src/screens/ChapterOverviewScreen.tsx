import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { HappyExpression, AngryExpression } from '../components/Faces';
import { useSelector } from 'react-redux';
import { type RootState } from '../store';
import { type Chapter } from '../data/types';
import ChapterMenuModal from '../components/ChapterMenuModal';

const ChapterOverviewScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const subjectsData = useSelector((state: RootState) => state.subjects.subjects);
  const chapterProgressList = useSelector((state: RootState) => state.streak.chapterProgress || []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const bookmarks = useSelector((state: RootState) => state.streak.bookmarks || []);

  let currentChapter: Chapter | null = null;
  let subjectName = '';
  let subSubjectName = '';

  for (const subject of subjectsData) {
    if (subject.chapters) {
      const found = subject.chapters.find(c => c.id === id);
      if (found) {
        currentChapter = found;
        subjectName = subject.title;
        break;
      }
    } else if (subject.subSubjects) {
      for (const sub of subject.subSubjects) {
        const found = sub.chapters.find(c => c.id === id);
        if (found) {
          currentChapter = found;
          subjectName = subject.title;
          subSubjectName = sub.title;
          break;
        }
      }
    }
    if (currentChapter) break;
  }

  
// --- ADD THESE 4 LINES ---
const progress = chapterProgressList.find((cp: any) => cp.chapterId === currentChapter?.id) || { attempted: 0, wrong: 0, progressLevel: 'Not Started' };
const wrongCount = progress.wrong;
const chapterBookmarks = bookmarks.filter((b: any) => b.chapterId === currentChapter?.id);
const bookmarkCount = chapterBookmarks.length;
// -------------------------


  if (!currentChapter) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-background-app text-center px-4">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Chapter Not Found</h1>
        <button onClick={() => navigate(-1)} className="mt-4 px-6 py-3 bg-surface-hover text-text-primary font-bold rounded-sm">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full bg-background-app flex flex-col relative shrink-0 h-full">
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
          
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-hover transition-colors active:scale-95"
          >
             <iconify-icon icon="solar:menu-dots-bold" width="20" style={{ color: "var(--color-text-primary)" }}></iconify-icon>
          </button>
        </header>

        {/* Breadcrumb & Title */}
        <div className="mb-2">
          <div className="flex items-center gap-1 text-xs font-bold text-text-muted mb-1 opacity-80">
            <span>{subjectName}</span>
            {subSubjectName && (
              <>
                <iconify-icon icon="solar:alt-arrow-right-linear" width="12"></iconify-icon>
                <span>{subSubjectName}</span>
              </>
            )}
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary leading-none">
            {currentChapter.title}
          </h1>
        </div>

        {/* High-Level Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mt-6">
          <div className="flex flex-col bg-surface-hover rounded-sm p-3 border border-border/50">
            <iconify-icon icon="solar:document-text-bold" width="16" style={{ color: "var(--color-text-muted)" }} className="mb-1"></iconify-icon>
            +  <span className="text-xl font-bold text-text-primary">{currentChapter.totalMcqs || 0}</span>
            <span className="text-xxs font-bold text-text-muted uppercase tracking-wider">Total MCQs</span>
          </div>
          
          {(() => {
            const progress = chapterProgressList.find((cp: any) => cp.chapterId === currentChapter!.id) || { attempted: 0, wrong: 0, progressLevel: 'Not Started' };
            const correct = progress.attempted > 0 ? progress.attempted - progress.wrong : 0;
            return (
              <>
                <div className="flex flex-col bg-surface-hover rounded-sm p-3 border border-border/50">
                  <iconify-icon icon="solar:check-circle-bold" width="16" style={{ color: "var(--color-text-muted)" }} className="mb-1"></iconify-icon>
                  <span className="text-xl font-bold text-text-primary">{progress.attempted}</span>
                  <span className="text-xxs font-bold text-text-muted uppercase tracking-wider">Attempted</span>
                </div>
                <div className="flex flex-col bg-surface-hover rounded-sm p-3 border border-border/50">
                  <iconify-icon icon="solar:target-bold" width="16" style={{ color: "var(--color-text-muted)" }} className="mb-1"></iconify-icon>
                  <span className="text-xl font-bold text-text-primary">{progress.attempted > 0 ? Math.round((correct / progress.attempted) * 100) : 0}%</span>
                  <span className="text-xxs font-bold text-text-muted uppercase tracking-wider">Accuracy</span>
                </div>
              </>
            );
          })()}
        </div>
      </div>

      {/* BOTTOM SECTION: ACTION WIDGETS */}
      <main className="flex-1 overflow-y-auto pt-1 pb-24 flex flex-col gap-layout-gap scrollbar-hide ">
        
        {/* Start Full Chapter - Green Widget */}
        <div 
          onClick={() => navigate(`/mcq/${currentChapter?.id}`)}
          className="bg-widget-quiz-bg rounded-sm p-card-pad flex flex-col h-[140px] justify-between relative cursor-pointer active:scale-95 transition-transform overflow-hidden shadow-sm"
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
            <span className="text-xs font-bold text-text-primary opacity-80 mt-1">Practice all {currentChapter.totalMcqs} questions</span>
          </div>
        </div>

        {/* Revise Wrong Only - Purple Widget */}
        <div 
    onClick={() => navigate(`/mcq/${currentChapter?.id}`)}
  className={`bg-widget-stress-bg rounded-sm p-card-pad flex flex-col h-[140px] justify-between relative cursor-pointer active:scale-95 transition-transform overflow-hidden shadow-sm ${wrongCount === 0 ? 'opacity-50 pointer-events-none' : ''}`}
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
            <span className="text-xs font-bold text-text-primary opacity-80 mt-1">
              {currentChapter.wrong > 0 ? `Focus on the ${currentChapter.wrong} you missed` : 'No wrong questions to revise!'}
            </span>
          </div>
        </div>

        {/* Revise Bookmarks - Yellow Widget */}
        <div 
          onClick={() => navigate(`/mcq/${currentChapter?.id}`)}
          className={`bg-widget-sleep-bg rounded-sm p-card-pad flex flex-col h-[140px] justify-between relative cursor-pointer active:scale-95 transition-transform overflow-hidden shadow-sm ${bookmarkCount === 0 ? 'opacity-50 pointer-events-none' : ''}`}
  >
          <div className="flex items-center justify-between z-10">
            <div className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center">
              <iconify-icon icon="solar:bookmark-circle-bold" width="24" style={{ color: "var(--color-text-primary)" }}></iconify-icon>
            </div>
            <span className="text-xs font-bold text-text-primary opacity-90">Saved Items</span>
          </div>
          
          <div className="flex flex-col z-10">
            <span className="text-2xl font-bold text-text-primary leading-tight">Revise Bookmarks</span>
            <span className="text-xs font-bold text-text-primary opacity-80 mt-1">
              {bookmarkCount > 0 ? `Review ${bookmarkCount} saved questions` : 'No bookmarked questions'}
    </span>
          </div>
        </div>

      </main>

      <ChapterMenuModal 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        chapterId={currentChapter.id} 
      />
    </div>
  );
};

export default ChapterOverviewScreen;
