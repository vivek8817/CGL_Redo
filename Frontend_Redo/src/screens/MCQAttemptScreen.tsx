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
    <>
      {/* Mobile Device Mockup Wrapper */}
      <div className="flex-1 w-full bg-background-app flex flex-col relative shrink-0 h-full">
        
        {/* Top Bar (Distraction Free) */}
        <header className="px-2 pt-12 pb-4 flex items-center justify-between z-10 relative">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-slate-100/10 flex items-center justify-center hover:bg-slate-100/20 transition-colors active:scale-95 text-white"
          >
            <iconify-icon icon="solar:close-circle-linear" width="24"></iconify-icon>
          </button>
          
          <div className="flex flex-col items-center flex-1 mx-4">
            <span className="text-xs font-bold text-white opacity-60 mb-1">
              Question {currentIndex + 1} of {mcqs.length}
            </span>
            <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
               <div className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
          
          <button 
            onClick={handleBookmark}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100/10 transition-colors active:scale-95 text-white"
          >
            <iconify-icon 
              icon={isBookmarked ? "solar:bookmark-bold" : "solar:bookmark-linear"} 
              width="24" 
            ></iconify-icon>
          </button>
        </header>

        {/* Main Content Area */}
        <main 
            className="flex-1 overflow-y-auto px-1 pb-32" 
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
          {/* Question Card */}
          <div className="bg-white rounded-t-[2rem] rounded-b-xl px-6 py-8 shadow-sm flex flex-col relative shrink-0 min-h-[300px]">
            <h2 className="text-xl font-bold text-slate-800 leading-snug">
              {currentQuestion.text}
            </h2>
            
            {/* Options Area */}
            <div className="flex flex-col gap-3 mt-8">
              {currentQuestion.options.map((option: any) => {
                const isSelected = selectedOption === option.id;
                const isCorrect = option.id === currentQuestion.correctOptionId;
                
                let optionClasses = "p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer flex items-center justify-between ";
                
                if (!isSubmitted) {
                  optionClasses += isSelected 
                    ? "bg-slate-800 text-white border-slate-800 shadow-md" 
                    : "bg-slate-50 border-transparent text-slate-800 hover:border-slate-200 hover:bg-slate-100";
                } else {
                  if (isCorrect) {
                    optionClasses += "bg-emerald-500/10 border-emerald-500 text-emerald-800";
                  } else if (isSelected && !isCorrect) {
                    optionClasses += "bg-red-500/10 border-red-400 text-red-700 opacity-90";
                  } else {
                    optionClasses += "bg-slate-50 border-transparent text-slate-800 opacity-40";
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
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      isSubmitted && isCorrect ? 'border-emerald-500 bg-emerald-500 text-white' :
                      isSubmitted && isSelected && !isCorrect ? 'border-red-500 bg-red-500 text-white' :
                      isSelected ? 'border-white bg-slate-800' : 'border-slate-300'
                    }`}>
                      {isSubmitted && isCorrect && <iconify-icon icon="solar:check-read-bold" width="12"></iconify-icon>}
                      {isSubmitted && isSelected && !isCorrect && <iconify-icon icon="solar:close-circle-bold" width="12"></iconify-icon>}
                      {!isSubmitted && isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Explanation Area */}
            {isSubmitted && (
              <div className="mt-8 p-5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-2 animate-[slideUp_0.3s_ease-out]">
                <div className="flex items-center gap-1 text-emerald-700">
                  <iconify-icon icon="solar:info-circle-bold" width="16"></iconify-icon>
                  <span className="text-xs font-bold uppercase tracking-wider">Explanation</span>
                </div>
                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}
          </div>
        </main>

        {/* Bottom Action Bar */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full p-5 z-50 bg-gradient-to-t from-slate-900 via-slate-900 to-transparent pt-12">
          {!isSubmitted ? (
            <button 
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-xl active:scale-95 transition-all ${
                selectedOption !== null 
                  ? 'bg-white text-slate-900 hover:bg-slate-100' 
                  : 'bg-white/10 text-white/40 cursor-not-allowed'
              }`}
            >
              Submit Answer
            </button>
          ) : (
            <button 
              onClick={handleNext}
              className="w-full py-4 rounded-xl font-bold text-lg shadow-xl active:scale-95 transition-all bg-emerald-500 text-white hover:bg-emerald-600 animate-[pulse_1s_ease-in-out_1]"
            >
              {currentIndex === mcqs.length - 1 ? "Finish Quiz" : "Next Question"}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default MCQAttemptScreen;
