import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState, type AppDispatch } from '../store';
import { fetchSyllabus } from '../store/subjectsSlice';

const SubjectsScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const subjectsData = useSelector((state: RootState) => state.subjects.subjects);
  const status = useSelector((state: RootState) => state.subjects.status);
  // ADD THIS BLOCK: Fetch syllabus immediately if the screen is loaded directly
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSyllabus());
    }
  }, [status, dispatch]);


  const getSubjectStats = (subject: any) => {
    const chapters = subject.chapters || (subject.subSubjects?.flatMap((s: any) => s.chapters) || []);
    let totalMcqs = 0;
    let attempted = 0;
    
    chapters.forEach((c: any) => {
      totalMcqs += c.totalMcqs;
      attempted += c.attempted;
    });

    const completion = totalMcqs > 0 ? Math.round((attempted / totalMcqs) * 100) : 0;
    return { chaptersCount: chapters.length, completion };
  };

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
        {subjectsData.map(subject => {
          const stats = getSubjectStats(subject);
          return (
            <div 
              key={subject.id} 
              onClick={() => navigate(`/subject/${subject.id}`)}
              className="bg-surface rounded-sm p-card-pad flex justify-between items-center shadow-sm cursor-pointer active:scale-95 transition-transform"
            >
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {subject.icon && <iconify-icon icon={subject.icon} width="20" style={{ color: "var(--color-text-primary)" }}></iconify-icon>}
                  <span className="text-lg font-bold text-text-primary leading-tight">{subject.title}</span>
                </div>
                <span className="text-xs text-text-muted font-semibold mt-1">{stats.chaptersCount} Chapters Total</span>
                
                <div className="w-full flex items-center gap-2 mt-3 opacity-80 pr-4">
                   <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                     <div className="h-full bg-text-primary rounded-full" style={{ width: `${stats.completion}%` }}></div>
                   </div>
                   <span className="text-xxs font-bold text-text-muted">{stats.completion}%</span>
                 </div>
              </div>
              
              <div className="w-10 h-10 rounded-full bg-surface-hover flex items-center justify-center shrink-0">
                <iconify-icon icon="solar:alt-arrow-right-linear" width="20" style={{ color: "var(--color-text-primary)" }}></iconify-icon>
              </div>
            </div>
          )
        })}
      </main>
    </>
  );
};

export default SubjectsScreen;
