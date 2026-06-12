import React from 'react';
import { useNavigate } from 'react-router';
import { JoyfulFace } from '../components/Faces';

const SessionResultScreen = () => {
  const navigate = useNavigate();

  // Mock result data
  const result = {
    total: 45,
    correct: 38,
    wrong: 7,
    accuracy: 84
  };

  return (
    <>
      {/* TOP SECTION: WHITE OVERLAY CARD */}
      <div className="bg-surface rounded-t-overlay rounded-b-sm px-card-pad pt-16 pb-8 z-10 flex flex-col items-center relative shrink-0 shadow-sm text-center">
        
        <JoyfulFace size={120} className="mb-6 drop-shadow-md" />

        <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary leading-none mb-2">
          Awesome Session!
        </h1>
        <p className="text-sm font-bold text-text-muted">
          You've mastered most of the concepts in <span className="text-text-primary">Motion and Force</span>.
        </p>

      </div>

      {/* BOTTOM SECTION: DARK BACKGROUND */}
      <main className="flex-1 overflow-y-auto pt-4 pb-24 flex flex-col gap-layout-gap scrollbar-hide px-card-pad">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-layout-gap mb-4">
          <div className="bg-widget-quiz-bg/20 border border-widget-quiz-bg/30 rounded-sm p-card-pad flex flex-col items-center justify-center gap-1">
             <span className="text-3xl font-display font-bold text-[#0f5132] leading-none">{result.correct}</span>
             <span className="text-xs font-bold text-[#0f5132] uppercase tracking-wider">Correct</span>
          </div>
          <div className="bg-widget-sleep-bg/20 border border-widget-sleep-chart/30 rounded-sm p-card-pad flex flex-col items-center justify-center gap-1">
             <span className="text-3xl font-display font-bold text-widget-sleep-chart leading-none">{result.wrong}</span>
             <span className="text-xs font-bold text-widget-sleep-chart uppercase tracking-wider">Wrong</span>
          </div>
        </div>

        <div className="bg-surface-hover rounded-sm p-card-pad flex justify-between items-center">
          <span className="text-sm font-bold text-text-muted">Overall Accuracy</span>
          <span className="text-2xl font-bold text-text-primary">{result.accuracy}%</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 mt-auto">
          <button 
            onClick={() => navigate('/mcq')}
            className="w-full py-4 rounded-sm font-bold text-lg shadow-xl active:scale-95 transition-all bg-widget-stress-bg text-text-primary flex justify-center items-center gap-2"
          >
            <iconify-icon icon="solar:refresh-circle-bold" width="24"></iconify-icon>
            Revise Wrong Only
          </button>
          
          <button 
            onClick={() => navigate('/chapter/1')}
            className="w-full py-4 rounded-sm font-bold text-lg active:scale-95 transition-all bg-surface-hover text-text-primary"
          >
            Back to Chapter Overview
          </button>
        </div>

      </main>
    </>
  );
};

export default SessionResultScreen;
