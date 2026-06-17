import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../store';
import { updateChapterProgress, toggleBookmark } from '../store/subjectsSlice';
import { logActivity } from '../store/streakSlice';
import { type Chapter } from '../data/types';

const MCQAttemptScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { chapterId } = useParams();
  const subjectsData = useSelector((state: RootState) => state.subjects.subjects);
  const bookmarks = useSelector((state: RootState) => state.subjects.bookmarks);

  // 1. Locate the chapter to load its MCQs
  let currentChapter: Chapter | null = null;
  let currentSubjectTitle = '';
  for (const subject of subjectsData) {
    if (subject.chapters) {
      const found = subject.chapters.find(c => c.id === chapterId);
      if (found) { currentChapter = found; currentSubjectTitle = subject.title; break; }
    } else if (subject.subSubjects) {
      for (const sub of subject.subSubjects) {
        const found = sub.chapters.find(c => c.id === chapterId);
        if (found) { currentChapter = found; currentSubjectTitle = subject.title; break; }
      }
    }
    if (currentChapter) break;
  }

  // 2. State for Quiz Progress
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  // Guard against missing chapter or no MCQs
  if (!currentChapter || !currentChapter.mcqs || currentChapter.mcqs.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-background-app px-4 text-center">
        <h1 className="text-xl font-bold text-text-primary mb-2">No MCQs Found</h1>
        <p className="text-sm text-text-muted mb-4">This chapter doesn't have any questions yet.</p>
        <button onClick={() => navigate(-1)} className="px-6 py-3 bg-surface-hover text-text-primary font-bold rounded-sm">
          Go Back
        </button>
      </div>
    );
  }

  const mcqs = currentChapter.mcqs;
  const currentQuestion = mcqs[currentIndex];
  
  const isBookmarked = bookmarks.some(b => b.mcqId === currentQuestion.id && b.chapterId === currentChapter!.id);

  // 3. Handlers
  const handleBookmark = () => {
    const correctAnswerText = currentQuestion.options.find(o => o.id === currentQuestion.correctOptionId)?.text || '';
    dispatch(toggleBookmark({
      mcqId: currentQuestion.id,
      chapterId: currentChapter!.id,
      subjectTitle: currentSubjectTitle,
      mcqText: currentQuestion.text,
      correctAnswerText,
      explanation: currentQuestion.explanation,
      timestamp: Date.now()
    }));
  };

  const handleOptionClick = (id: number) => {
    if (isSubmitted) return;
    setSelectedOption(id);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    
    // Track score
    if (selectedOption === currentQuestion.correctOptionId) {
      setCorrectCount(prev => prev + 1);
    } else {
      setWrongCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < mcqs.length - 1) {
      // Go to next question
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      // Finished all questions!
      const finalCorrect = selectedOption === currentQuestion.correctOptionId ? correctCount + 1 : correctCount;
      const finalWrong = selectedOption === currentQuestion.correctOptionId ? wrongCount : wrongCount + 1;
      
      const progressLevel = finalWrong === 0 ? 'Strong' : finalWrong <= 2 ? 'Improving' : 'Weak';

      // Update Redux Store Globally
      dispatch(updateChapterProgress({
        chapterId: currentChapter!.id,
        attempted: mcqs.length,
        wrong: finalWrong,
        progressLevel
      }));

      // Log Daily Activity
      dispatch(logActivity({
        attempted: mcqs.length,
        correct: finalCorrect,
        subjectTitle: currentSubjectTitle
      }));

      // Go to result screen with real data
      navigate('/result', { 
        replace: true,
        state: {
          score: finalCorrect,
          wrong: finalWrong,
          total: mcqs.length
        }
      });
    }
  };

  const progressPercent = ((currentIndex) / mcqs.length) * 100;

  return (
    <div className="flex-1 w-full bg-background-app flex flex-col relative shrink-0 h-full">
      
      {/* Top Bar (Distraction Free) */}
      <header className="px-card-pad pt-12 pb-4 flex items-center justify-between z-10 relative">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-surface-hover/20 flex items-center justify-center hover:bg-surface-hover/30 transition-colors active:scale-95"
        >
          <iconify-icon icon="solar:close-circle-linear" width="24" style={{ color: "var(--color-text-inverse)" }}></iconify-icon>
        </button>
        
        <div className="flex flex-col items-center flex-1 mx-4">
          <span className="text-xs font-bold text-text-inverse opacity-60 mb-1">
            Question {currentIndex + 1} of {mcqs.length}
          </span>
          <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
             <div className="h-full bg-widget-quiz-bg rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        <button 
          onClick={handleBookmark}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-hover/20 transition-colors active:scale-95"
        >
          <iconify-icon 
            icon={isBookmarked ? "solar:bookmark-bold" : "solar:bookmark-linear"} 
            width="24" 
            style={{ color: "var(--color-text-inverse)" }}
          ></iconify-icon>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-layout-gap pb-24 scrollbar-hide">
        {/* Question Card */}
        <div className="bg-surface rounded-t-overlay rounded-b-sm px-card-pad py-8 shadow-sm flex flex-col relative shrink-0 min-h-[300px]">
          <h2 className="text-xl font-bold text-text-primary leading-snug">
            {currentQuestion.text}
          </h2>

          <div className="flex flex-col gap-inner-gap mt-8">
            {currentQuestion.options.map(option => {
              const isSelected = selectedOption === option.id;
              const isCorrect = option.id === currentQuestion.correctOptionId;
              
              let optionClasses = "p-card-pad rounded-sm border-2 transition-all cursor-pointer flex items-center justify-between ";
              
              if (!isSubmitted) {
                optionClasses += isSelected 
                  ? "bg-text-primary text-text-inverse border-text-primary shadow-md" 
                  : "bg-surface-hover border-transparent text-text-primary hover:border-border";
              } else {
                if (isCorrect) {
                  optionClasses += "bg-widget-quiz-bg/20 border-widget-quiz-bg text-[#0f5132]";
                } else if (isSelected && !isCorrect) {
                  optionClasses += "bg-widget-sleep-bg/20 border-widget-sleep-chart text-widget-sleep-chart opacity-80";
                } else {
                  optionClasses += "bg-surface-hover border-transparent text-text-primary opacity-50";
                }
              }

              return (
                <div 
                  key={option.id} 
                  onClick={() => handleOptionClick(option.id)}
                  className={optionClasses}
                >
                  <span className="font-bold text-sm leading-tight pr-4">{option.text}</span>
                  {/* Radio indicator */}
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSubmitted && isCorrect ? 'border-widget-quiz-bg bg-widget-quiz-bg text-white' :
                    isSubmitted && isSelected && !isCorrect ? 'border-widget-sleep-chart bg-widget-sleep-chart text-white' :
                    isSelected ? 'border-white' : 'border-text-muted/40'
                  }`}>
                    {isSubmitted && isCorrect && <iconify-icon icon="solar:check-read-bold" width="12"></iconify-icon>}
                    {isSubmitted && isSelected && !isCorrect && <iconify-icon icon="solar:close-circle-bold" width="12"></iconify-icon>}
                    {!isSubmitted && isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Explanation Area */}
          {isSubmitted && (
            <div className="mt-8 p-card-pad bg-[#f8f9fa] rounded-sm border border-border flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex items-center gap-1 text-[#0f5132]">
                <iconify-icon icon="solar:info-circle-bold" width="16"></iconify-icon>
                <span className="text-xs font-bold uppercase tracking-wider">Explanation</span>
              </div>
              <p className="text-sm font-semibold text-text-muted leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Action Bar */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full p-layout-gap z-50 bg-background-app">
        {!isSubmitted ? (
          <button 
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className={`w-full py-4 rounded-sm font-bold text-lg shadow-xl active:scale-95 transition-all ${
              selectedOption !== null 
                ? 'bg-surface text-text-primary' 
                : 'bg-surface-hover/20 text-white/40 cursor-not-allowed'
            }`}
          >
            Submit Answer
          </button>
        ) : (
          <button 
            onClick={handleNext}
            className="w-full py-4 rounded-sm font-bold text-lg shadow-xl active:scale-95 transition-all bg-widget-quiz-bg text-text-primary"
          >
            {currentIndex === mcqs.length - 1 ? "Finish Quiz" : "Next Question"}
          </button>
        )}
      </div>

    </div>
  );
};

export default MCQAttemptScreen;
