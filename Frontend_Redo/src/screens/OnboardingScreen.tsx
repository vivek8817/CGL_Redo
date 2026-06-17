import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  SensitiveFace,
  JoyfulFace,
  HappyFace
} from '../components/Faces';

const OnboardingScreen = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Focus on Weaknesses",
      description: "We analyze your mock tests and intelligently push your weakest chapters to the top of your revision list.",
      face: <SensitiveFace size="200" className="drop-shadow-lg" />
    },
    {
      title: "Track Your Streaks",
      description: "Maintain your learning momentum with our unique mood-based streak calendar. Build unbreakable habits.",
      face: <JoyfulFace size="200" className="drop-shadow-lg" />
    },
    {
      title: "Distraction-Free",
      description: "Experience minimalist, deep-focus mock tests designed purely for high retention and speed.",
      face: <HappyFace size="200" className="drop-shadow-lg" />
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(prev => prev + 1);
    } else {
      navigate('/login');
    }
  };

  const handleSkip = () => {
    navigate('/login');
  };

  return (
    <div className="flex-1 w-full relative bg-surface overflow-hidden flex flex-col">
      
      {/* SKIP BUTTON */}
      <div className="absolute top-8 right-6 z-20">
        <button onClick={handleSkip} className="text-sm font-bold text-text-muted hover:text-text-primary active:scale-95 transition-all">
          Skip
        </button>
      </div>

      {/* TOP VISUAL AREA (Faces) */}
      <div className="flex-1 w-full bg-background-app rounded-b-overlay flex items-center justify-center relative overflow-hidden transition-colors duration-500">
        
        {/* Background decorations based on step */}
        <div className="absolute w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl mix-blend-overlay"></div>

        <div className={`transition-all duration-500 transform ${step === 0 ? 'scale-100 opacity-100' : 'scale-75 opacity-0 absolute'}`}>
          {step === 0 && steps[0].face}
        </div>
        <div className={`transition-all duration-500 transform ${step === 1 ? 'scale-100 opacity-100' : 'scale-75 opacity-0 absolute'}`}>
          {step === 1 && steps[1].face}
        </div>
        <div className={`transition-all duration-500 transform ${step === 2 ? 'scale-100 opacity-100' : 'scale-75 opacity-0 absolute'}`}>
          {step === 2 && steps[2].face}
        </div>
      </div>

      {/* BOTTOM CONTENT AREA */}
      <div className="h-[340px] px-card-pad py-8 flex flex-col shrink-0 bg-surface">
        
        {/* Pagination Dots */}
        <div className="flex gap-2 justify-center mb-8">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-text-primary' : 'w-2 bg-border'}`}
            />
          ))}
        </div>

        {/* Text Content */}
        <div className="text-center flex-1">
          <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary mb-3">
            {steps[step].title}
          </h2>
          <p className="text-sm font-bold text-text-muted leading-relaxed px-2">
            {steps[step].description}
          </p>
        </div>

        {/* Action Button */}
        <button 
          onClick={handleNext}
          className="w-full py-4 rounded-sm font-bold text-lg shadow-lg active:scale-95 transition-all bg-text-primary text-text-inverse mb-4 flex justify-center items-center gap-2"
        >
          {step === steps.length - 1 ? "Get Started" : "Continue"}
        </button>

      </div>
      
    </div>
  );
};

export default OnboardingScreen;
