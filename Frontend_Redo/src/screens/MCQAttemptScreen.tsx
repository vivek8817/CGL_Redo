import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../store';
import { fetchDashboard } from '../store/streakSlice';
import { fetchSyllabus } from '../store/subjectsSlice';
import api from '../services/api';

const MCQAttemptScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { chapterId } = useParams();
  
  // Grab our bookmarks from Redux
  const bookmarks = useSelector((state: RootState) => state.streak.bookmarks);

  // --- NEW STATE FOR API DATA ---
  const [mcqs, setMcqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. FETCH MCQS FROM MONGODB WHEN SCREEN LOADS!
  useEffect(() => {
    const loadMcqs = async () => {
      try {
        const response = await api.get(`/mcqs/${chapterId}`);
        setMcqs(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load MCQs');
      } finally {
        setLoading(false);
      }
    };
    loadMcqs();
  }, [chapterId]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  if (loading) return <div className="p-8 text-center font-bold">Loading questions...</div>;
  if (error) return <div className="p-8 text-center font-bold text-red-500">{error}</div>;
  if (mcqs.length === 0) return <div className="p-8 text-center font-bold">No MCQs found.</div>;

  const currentQuestion = mcqs[currentIndex];
  // Check if this specific question exists in our bookmarks array
  const isBookmarked = bookmarks.some(b => b._id === currentQuestion._id);

  // 2. TOGGLE BOOKMARK IN BACKEND
  const handleBookmark = async () => {
    try {
      await api.post('/progress/bookmark', { mcqId: currentQuestion._id });
      dispatch(fetchDashboard()); // Refresh bookmarks from backend!
    } catch (err) {
      console.error("Failed to bookmark", err);
    }
  };

  const handleOptionClick = (id: number) => {
    if (isSubmitted) return;
    setSelectedOption(id);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === currentQuestion.correctOptionId) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = async () => {
    if (currentIndex < mcqs.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      // 3. FINISHED QUIZ! SUBMIT TO MONGODB!
      const finalCorrect = selectedOption === currentQuestion.correctOptionId ? correctCount + 1 : correctCount;
      
      try {
        await api.post('/progress/submit', {
          chapterId,
          totalAttempted: mcqs.length,
          totalCorrect: finalCorrect
        });
        
        // Refresh Redux so the Home Screen rings update!
        dispatch(fetchDashboard());
        dispatch(fetchSyllabus());
        
        navigate('/result', { replace: true, state: { score: finalCorrect, total: mcqs.length }});
      } catch (err) {
        console.error("Failed to save progress", err);
      }
    }
  };

  const progressPercent = ((currentIndex) / mcqs.length) * 100;

  return (
    <div className="flex-1 w-full bg-surface overflow-hidden flex flex-col relative z-0">
      {/* Top Header */}
      <header className="px-card-pad py-6 flex items-center justify-between border-b border-border bg-surface shrink-0 relative z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-surface-hover active:bg-border transition-colors">
          <svg className="w-6 h-6 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="font-bold text-lg text-text-primary tracking-tight">Question {currentIndex + 1}</span>
        <button onClick={handleBookmark} className="p-2 -mr-2 rounded-full hover:bg-surface-hover active:bg-border transition-colors group">
          <svg className={`w-6 h-6 transition-colors ${isBookmarked ? 'text-primary fill-primary' : 'text-text-muted group-hover:text-primary group-active:text-primary'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </header>

      {/* Progress Bar */}
      <div className="h-1 bg-surface-hover w-full shrink-0 relative z-10">
        <div className="h-full bg-primary transition-all duration-300 ease-out" style={{ width: `${progressPercent}%` }} />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative z-0">
        <div className="px-card-pad py-8 flex flex-col min-h-full">
          <h2 className="text-2xl font-bold text-text-primary leading-snug mb-8">{currentQuestion.text}</h2>

          <div className="flex flex-col gap-3">
            {currentQuestion.options.map((option: any) => {
              const isSelected = selectedOption === option.id;
              const isCorrect = option.id === currentQuestion.correctOptionId;
              
              let optionClasses = "p-card-pad rounded-sm border-2 flex justify-between items-center cursor-pointer transition-all active:scale-[0.99] ";
              
              if (!isSubmitted) {
                optionClasses += isSelected 
                  ? "bg-text-primary border-text-primary text-text-inverse" 
                  : "bg-surface border-border text-text-primary hover:border-text-muted/30";
              } else {
                if (isCorrect) optionClasses += "bg-widget-quiz-bg/10 border-widget-quiz-bg text-text-primary";
                else if (isSelected && !isCorrect) optionClasses += "bg-widget-sleep-bg/20 border-widget-sleep-chart text-text-primary";
                else optionClasses += "bg-surface border-border text-text-muted opacity-50 pointer-events-none";
              }

              return (
                <div 
                  key={option.id} 
                  onClick={() => !isSubmitted && handleOptionClick(option.id)}
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
              );
            })}
          </div>

          {/* Explanation Area */}
          {isSubmitted && (
            <div className="mt-8 p-card-pad bg-[#f8f9fa] rounded-sm border border-border flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300 mb-24">
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
      </div>

      {/* Bottom Action Bar */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full p-layout-gap z-50 bg-background-app">
        {!isSubmitted ? (
          <button 
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className={`w-full py-4 rounded-sm font-bold text-lg shadow-xl active:scale-95 transition-all ${
              selectedOption !== null 
                ? 'bg-surface text-text-primary' 
                : 'bg-surface-hover/20 text-text-primary/40 cursor-not-allowed'
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
