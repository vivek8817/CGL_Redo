import React from 'react';
import { useNavigate } from 'react-router';

const SubjectsScreen = () => {
  const navigate = useNavigate();

  const subjects = [
    { id: 1, name: 'Science', chapters: 14, completion: 45 },
    { id: 2, name: 'Static GK', chapters: 20, completion: 12 },
    { id: 3, name: 'History', chapters: 18, completion: 80 },
    { id: 4, name: 'Geography', chapters: 15, completion: 0 }
  ];

  return (
    <>
      {/* TOP SECTION */}
      <div className="bg-surface rounded-t-overlay rounded-b-sm px-card-pad pt-12 pb-6 z-10 flex flex-col relative shrink-0 shadow-sm">
        <header className="flex justify-between items-center mb-6">
          <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary leading-none">
            All Subjects
          </h1>
          <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-surface-hover transition-colors active:scale-95">
             <iconify-icon icon="solar:magnifer-linear" width="20" style={{ color: "var(--color-text-primary)" }}></iconify-icon>
          </button>
        </header>
      </div>

      {/* BOTTOM SECTION */}
      <main className="flex-1 overflow-y-auto pt-1 pb-24 flex flex-col gap-inner-gap scrollbar-hide ">
        {subjects.map(subject => (
          <div 
            key={subject.id} 
            onClick={() => navigate(`/subject/${subject.id}`)}
            className="bg-surface rounded-sm p-card-pad flex justify-between items-center shadow-sm cursor-pointer active:scale-95 transition-transform"
          >
            <div className="flex flex-col flex-1">
              <span className="text-lg font-bold text-text-primary leading-tight">{subject.name}</span>
              <span className="text-xs text-text-muted font-semibold mt-1">{subject.chapters} Chapters Total</span>
              
              <div className="w-full flex items-center gap-2 mt-3 opacity-80 pr-4">
                 <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                   <div className="h-full bg-text-primary rounded-full" style={{ width: `${subject.completion}%` }}></div>
                 </div>
                 <span className="text-xxs font-bold text-text-muted">{subject.completion}%</span>
               </div>
            </div>
            
            <div className="w-10 h-10 rounded-full bg-surface-hover flex items-center justify-center shrink-0">
              <iconify-icon icon="solar:alt-arrow-right-linear" width="20" style={{ color: "var(--color-text-primary)" }}></iconify-icon>
            </div>
          </div>
        ))}
      </main>
    </>
  );
};

export default SubjectsScreen;
