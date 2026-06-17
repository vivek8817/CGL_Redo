import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { type RootState } from '../store';
import { type Chapter } from '../data/types';
import SubjectMenuModal from '../components/SubjectMenuModal';
import { useState } from 'react';

const SubjectDetailScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const subjectsData = useSelector((state: RootState) => state.subjects.subjects);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Find subject or sub-subject
  let currentSubject: any = subjectsData.find(s => s.id === id);
  let parentSubject: any = null;
  
  if (!currentSubject) {
    // Check if it's a sub-subject
    for (const s of subjectsData) {
      if (s.subSubjects) {
        const sub = s.subSubjects.find(sub => sub.id === id);
        if (sub) {
          currentSubject = sub;
          parentSubject = s;
          break;
        }
      }
    }
  }

  if (!currentSubject) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-background-app px-4 text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Subject Not Found</h1>
        <button onClick={() => navigate('/home')} className="mt-4 px-6 py-3 bg-surface-hover text-text-primary font-bold rounded-sm">
          Go Home
        </button>
      </div>
    );
  }

  const isNestedParent = currentSubject.isNested;

  const chapterProgressList = useSelector((state: RootState) => state.streak.chapterProgress || []);

  let totalAttempted = 0;
  let totalWrong = 0;
  let completedChapters = 0;

  const chaptersToUse: Chapter[] = isNestedParent 
    ? currentSubject.subSubjects?.flatMap((sub: any) => sub.chapters || []) || []
    : currentSubject.chapters || [];

  chaptersToUse.forEach(c => {
    const progress = chapterProgressList.find((cp: any) => cp.chapterId === c.id) || { attempted: 0, wrong: 0, progressLevel: 'Not Started' };
    
    totalAttempted += progress.attempted;
    totalWrong += progress.wrong;
    if (progress.progressLevel === 'Strong') completedChapters++;
  });

  const accuracy = totalAttempted > 0 ? Math.round(((totalAttempted - totalWrong) / totalAttempted) * 100) : 0;

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

        {/* Subject Title and Stats */}
        <div className="mb-2 mt-2">
          {parentSubject && (
            <span className="text-sm font-bold text-text-muted mb-1 block">
              {parentSubject.title}
            </span>
          )}
          <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary leading-none">
            {currentSubject.title}
          </h1>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-text-primary">{accuracy}%</span>
            <span className="text-xs font-semibold text-text-muted">Accuracy</span>
          </div>
          <div className="w-px h-8 bg-border"></div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-text-primary">{completedChapters}/{chaptersToUse.length}</span>
            <span className="text-xs font-semibold text-text-muted">Chapters Completed</span>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: DARK BACKGROUND */}
      <main className="flex-1 overflow-y-auto pt-1 pb-24 flex flex-col gap-layout-gap scrollbar-hide px-layout-gap">
        
        {isNestedParent ? (
          <>
            <div className="flex items-center gap-2 mt-2 mb-2 opacity-60">
              <span className="text-xs font-bold text-text-inverse uppercase tracking-wider">Historical Eras</span>
            </div>
            
            <div className="flex flex-col gap-inner-gap">
              {currentSubject.subSubjects.map((sub: any) => (
                <div 
                  key={sub.id} 
                  onClick={() => navigate(`/subject/${sub.id}`)}
                  className="bg-surface rounded-sm p-card-pad flex justify-between items-center shadow-sm cursor-pointer active:scale-95 transition-transform"
                >
                  <div className="flex flex-col flex-1 pr-4">
                    <span className="text-lg font-bold text-text-primary leading-tight mb-1">{sub.title}</span>
                    <span className="text-xs font-bold text-text-muted">{sub.chapters.length} Chapters</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-surface-hover flex items-center justify-center shrink-0">
                    <iconify-icon icon="solar:alt-arrow-right-linear" width="20" style={{ color: "var(--color-text-primary)" }}></iconify-icon>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Sorting Label */}
            <div className="flex items-center gap-2 mt-2 mb-2 opacity-60">
              <iconify-icon icon="solar:sort-from-bottom-to-top-linear" width="16" style={{ color: "var(--color-text-inverse)" }}></iconify-icon>
              <span className="text-xs font-bold text-text-inverse">Automatically ordered by weak areas</span>
            </div>

            {/* Chapter List */}
            <div className="flex flex-col gap-inner-gap">
              {chaptersToUse.map((chapter: Chapter) => {
                const progress = chapterProgressList.find((cp: any) => cp.chapterId === chapter.id) || { attempted: 0, wrong: 0, progressLevel: 'Not Started' };
                const chapterAccuracy = progress.attempted > 0 ? Math.round(((progress.attempted - progress.wrong) / progress.attempted) * 100) : 0;
                
                return (
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
                          progress.progressLevel === 'Weak' ? 'bg-widget-sleep-bg/40 text-widget-sleep-chart' : 
                          progress.progressLevel === 'Improving' ? 'bg-widget-stress-bg/40 text-widget-stress-chart' :
                          progress.progressLevel === 'Strong' ? 'bg-widget-quiz-bg/60 text-[#0f5132]' :
                          'bg-surface-hover text-text-muted'
                        }`}>
                          {progress.progressLevel}
                        </div>
                        
                        {/* Wrong Count Badge */}
                        {progress.wrong > 0 && (
                          <div className="flex items-center gap-1 text-widget-sleep-chart text-xs font-bold bg-widget-sleep-bg/20 px-2 py-1 rounded-sm">
                              <iconify-icon icon="solar:close-circle-bold" width="12"></iconify-icon>
                              {progress.wrong} Wrong
                          </div>
                        )}
                      </div>

                      {/* Accuracy Progress Bar if attempted */}
                      {progress.attempted > 0 && (
                        <div className="w-full flex items-center gap-2 mt-2 opacity-80">
                          <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                            <div className="h-full bg-text-primary rounded-full" style={{ width: `${chapterAccuracy}%` }}></div>
                          </div>
                          <span className="text-xxs font-bold text-text-muted">{chapterAccuracy}%</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center shrink-0">
                      <iconify-icon icon="solar:alt-arrow-right-linear" width="20" style={{ color: "var(--color-text-primary)" }}></iconify-icon>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>

      <SubjectMenuModal 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        subjectId={currentSubject.id} 
      />
    </div>
  );
};

export default SubjectDetailScreen;
