import React from 'react';
import { useSelector } from 'react-redux';
import * as Popover from '@radix-ui/react-popover';
import { AngryFace, HappyFace, NeutralFace } from '../components/Faces';
import { type RootState } from '../store';

const CalendarScreen = () => {
  const activityLog = useSelector((state: RootState) => state.streak.activityLog);
  const today = new Date();

  // Generate days for the current month (Mocking June for the UI title, but using current month logic)
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const monthName = today.toLocaleString('default', { month: 'long' });

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => {
    const d = new Date(currentYear, currentMonth, i + 1);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const isFuture = d > today && d.getDate() !== today.getDate();
    return { date: d, dateStr, isFuture };
  });

  // Calculate Monthly Stats
  let currentStreak = 0;
  let totalQuestionsThisMonth = 0;
  const subjectCounts: Record<string, number> = {};

  // Calculate streak backwards from today
  for (let i = today.getDate(); i > 0; i--) {
    const d = new Date(currentYear, currentMonth, i);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const log = activityLog[dateStr];
    if (log && log.questionsAttempted >= 20) {
      currentStreak++;
    } else if (!log || log.questionsAttempted < 20) {
      // Break the streak if we find a day with < 20 questions, 
      // but don't break it if today is just starting (0 questions today).
      if (i !== today.getDate() || (log && log.questionsAttempted > 0)) {
        break;
      }
    }
  }

  // Calculate totals
  daysArray.forEach(({ dateStr, isFuture }) => {
    if (isFuture) return;
    const log = activityLog[dateStr];
    if (log) {
      totalQuestionsThisMonth += log.questionsAttempted;
      log.subjectsStudied.forEach(s => {
        subjectCounts[s] = (subjectCounts[s] || 0) + 1;
      });
    }
  });

  const topSubject = Object.entries(subjectCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';

  const renderFace = (dateStr: string, isFuture: boolean) => {
    if (isFuture) return <span className="text-text-muted opacity-40 font-bold text-md cursor-default">---</span>;
    const log = activityLog[dateStr];
    
    if (!log || log.questionsAttempted === 0) return <AngryFace className="cursor-pointer active:scale-95 transition-transform" />;
    if (log.questionsAttempted < 20) return <NeutralFace className="cursor-pointer active:scale-95 transition-transform" />;
    return <HappyFace className="cursor-pointer active:scale-95 transition-transform" />;
  };

  const formatPopoverDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  };

  return (
    <div className="flex-1 w-full bg-background-app flex flex-col relative shrink-0 h-full">
      {/* TOP SECTION: WHITE CALENDAR CARD */}
      <div className="bg-surface rounded-t-overlay rounded-b-sm px-card-pad pt-12 pb-8 z-10 flex flex-col relative shrink-0 shadow-sm">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-inner-gap">
            <h1 className="font-display text-4xl font-bold text-text-primary tracking-tight">
              {monthName}
            </h1>
          </div>
          <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-surface-hover transition-colors active:scale-95">
             <iconify-icon icon="solar:history-linear" width="20" style={{ color: "var(--color-text-primary)" }}></iconify-icon>
          </button>
        </header>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 mb-4">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
            <div key={i} className="text-center text-xs font-bold text-text-muted uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-y-4 gap-x-2">
          {daysArray.map(({ date, dateStr, isFuture }) => {
            const log = activityLog[dateStr];
            const accuracy = log && log.questionsAttempted > 0 
              ? Math.round((log.correctAnswers / log.questionsAttempted) * 100) 
              : 0;

            return (
              <Popover.Root key={dateStr}>
                <Popover.Trigger asChild>
                  <div className="flex flex-col items-center gap-1 outline-none">
                    {renderFace(dateStr, isFuture)}
                    <span className="text-[10px] font-bold text-text-muted opacity-80">{date.getDate()}</span>
                  </div>
                </Popover.Trigger>
                
                {!isFuture && (
                  <Popover.Portal>
                    <Popover.Content 
                      sideOffset={5} 
                      className="z-50 bg-surface rounded-sm shadow-xl border border-border p-4 w-64 animate-in fade-in zoom-in-95 duration-200"
                    >
                      <div className="flex flex-col gap-3">
                        <span className="text-xs font-bold text-text-muted uppercase tracking-wider border-b border-border pb-2">
                          {formatPopoverDate(date)}
                        </span>
                        
                        {log && log.questionsAttempted > 0 ? (
                          <>
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-semibold text-text-primary">Attempted</span>
                              <span className="text-sm font-bold text-text-primary">{log.questionsAttempted}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-semibold text-text-primary">Accuracy</span>
                              <span className={`text-sm font-bold ${accuracy >= 70 ? 'text-[#0f5132]' : 'text-widget-sleep-chart'}`}>
                                {accuracy}%
                              </span>
                            </div>
                            {log.subjectsStudied.length > 0 && (
                              <div className="flex flex-col mt-1">
                                <span className="text-xs font-bold text-text-muted mb-1">Subjects Studied</span>
                                <div className="flex flex-wrap gap-1">
                                  {log.subjectsStudied.map((sub, i) => (
                                    <span key={i} className="px-2 py-1 bg-surface-hover rounded-sm text-xs font-bold text-text-primary">
                                      {sub}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="py-2 flex items-center justify-center gap-2 text-widget-sleep-chart opacity-80">
                            <iconify-icon icon="solar:sleeping-bold" width="20"></iconify-icon>
                            <span className="text-sm font-bold">No activity logged.</span>
                          </div>
                        )}
                      </div>
                      <Popover.Arrow className="fill-surface" />
                    </Popover.Content>
                  </Popover.Portal>
                )}
              </Popover.Root>
            );
          })}
        </div>
      </div>

      {/* BOTTOM SECTION: MONTHLY WIDGETS */}
      <main className="flex-1 overflow-y-auto pt-4 pb-24 flex flex-col gap-layout-gap scrollbar-hide px-layout-gap">
        
        {/* Streak Widget */}
        <div className="bg-widget-quiz-bg rounded-sm p-card-pad flex justify-between items-center shadow-sm relative overflow-hidden">
          <div className="flex flex-col z-10">
            <span className="text-xs font-bold text-text-primary opacity-80 uppercase tracking-wider mb-1">Current Streak</span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-display font-bold text-text-primary leading-none">{currentStreak}</span>
              <span className="text-sm font-bold text-text-primary">Days</span>
            </div>
            {currentStreak === 0 && <span className="text-xs font-bold text-text-primary opacity-70 mt-1">Hit 20 questions to start a streak!</span>}
            {currentStreak > 0 && <span className="text-xs font-bold text-text-primary opacity-70 mt-1">Don't break the chain! 🔥</span>}
          </div>
          <iconify-icon icon="solar:fire-bold" width="80" className="absolute -right-4 -bottom-4 opacity-20 text-text-primary"></iconify-icon>
        </div>

        {/* Volume & Subject Grid */}
        <div className="grid grid-cols-2 gap-layout-gap">
          <div className="bg-surface-hover rounded-sm p-card-pad flex flex-col gap-1 border border-border/50">
            <iconify-icon icon="solar:document-text-bold" width="20" style={{ color: "var(--color-text-muted)" }} className="mb-1"></iconify-icon>
            <span className="text-2xl font-bold text-text-primary">{totalQuestionsThisMonth}</span>
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Monthly Volume</span>
          </div>
          
          <div className="bg-surface-hover rounded-sm p-card-pad flex flex-col gap-1 border border-border/50">
            <iconify-icon icon="solar:star-circle-bold" width="20" style={{ color: "var(--color-text-muted)" }} className="mb-1"></iconify-icon>
            <span className="text-base font-bold text-text-primary leading-tight mt-1 line-clamp-2 min-h-[40px]">{topSubject}</span>
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Top Subject</span>
          </div>
        </div>

      </main>
    </div>
  );
};

export default CalendarScreen;
