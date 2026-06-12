import React from 'react';
import { AngryFace, HappyFace, NeutralFace, HappyExpression } from '../components/Faces';

const CalendarScreen = () => {
  // Mock data for the calendar grid
  // In streaks: 'present' = HappyFace (Yellow), 'absent' = AngryFace (Orange)
  const calendarData = [
    { status: 'present' }, { status: 'present' }, { status: 'absent' }, { status: 'present' }, { status: 'present' }, { status: 'present' }, { status: 'absent' },
    { status: 'present' }, { status: 'present' }, { status: 'mediocre' }, { status: 'present' }, { status: 'absent' }, { status: 'present' }, { status: 'mediocre' },
    { status: 'present' }, { status: 'present' }, { status: 'present' }, { status: 'present' }, { status: 'present' }, { status: 'absent' }, { status: 'present' },
    { status: 'absent' }, { status: 'absent' }, { status: 'present' }, { status: 'present' }, { status: 'present' }, { status: 'present' }, { status: 'present' },
  ];

  const renderFace = (status: string) => {
    switch (status) {
      case 'present': return <HappyFace />;
      case 'absent': return <AngryFace />;
      case 'mediocre': return <NeutralFace />;
      default: return <span className="text-text-muted opacity-40 font-bold text-md">---</span>;
    }
  };

  return (
    <>
      {/* TOP SECTION: WHITE CALENDAR CARD */}
      <div className="bg-surface rounded-t-overlay rounded-b-sm px-card-pad pt-12 pb-8 z-10 flex flex-col relative shrink-0">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-inner-gap">
            <h1 className="font-display text-4xl font-bold text-text-primary tracking-tight">
              June
            </h1>
            <iconify-icon icon="solar:alt-arrow-down-linear" width="24" style={{ color: "var(--color-text-primary)" }}></iconify-icon>
          </div>
          <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-surface-hover transition-colors active:scale-95">
             <iconify-icon icon="solar:menu-dots-bold" width="20" style={{ color: "var(--color-text-primary)" }}></iconify-icon>
          </button>
        </header>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
            <div key={i} className="text-center text-xs font-bold text-text-muted opacity-60">
              {day}
            </div>
          ))}
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-7 gap-layout-gap">
          {calendarData.map((day, i) => (
            <div key={i} className="aspect-square rounded-sm bg-surface-hover flex justify-center items-center rounded-lg relative transition-transform active:scale-90 cursor-pointer">
              <div className="absolute inset-1 flex justify-center items-center">
                 {renderFace(day.status)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <main className="flex-1 overflow-y-auto pt-1 pb-24 flex flex-col gap-layout-gap">
        
        {/* Monthly Streak Summary Card */}
        <div className="bg-widget-sleep-bg rounded-sm p-card-pad py-8 flex flex-col justify-start items-start  shadow-sm relative overflow-hidden">
          
          {/* Floating expression replacing the full face */}
          <HappyExpression className="absolute -bottom-6 -right-16  rotate-[-15deg] w-48 h-48" />

          <div className="flex flex-col z-10">
            <span className="text-xs font-bold text-text-primary opacity-80 mb-1">
              Monthly Consistency
            </span>
            <span className="text-2xl font-bold text-text-primary leading-none">
              Incredible!
            </span>
          </div>

          <div className="bg-background-app text-white px-4 py-2 mt-4 rounded-full font-bold text-sm shadow-md z-10">
            View Details
          </div>
        </div>

        {/* Grid for Detailed Stats */}
        <div className="grid grid-cols-2 gap-layout-gap">
          
          {/* Present Card */}
          <div className="bg-white rounded-sm p-card-pad flex flex-col gap-layout-gap shadow-sm">
            <span className="text-base font-bold text-text-muted">Present</span>
            <div className="flex flex-col pt-6">
              <span className="text-xl font-bold text-text-primary leading-tight">22 Days</span>
              <span className="text-xs font-semibold text-text-muted">Goal achieved</span>
            </div>
          </div>

          {/* Absent Card */}
          <div className="bg-white rounded-sm p-card-pad flex flex-col gap-layout-gap shadow-sm">
            <span className="text-base font-bold text-text-muted">Missed</span>
            <div className="flex flex-col pt-6">
              <span className="text-xl font-bold text-text-primary leading-tight">4 Days</span>
              <span className="text-xs font-semibold text-text-muted">Stay focused</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CalendarScreen;
