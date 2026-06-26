import  { useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  JoyfulFace,
  SensitiveFace,
  AngryFace,
  InsecureFace,
  ConfusedFace,
  HappyFace,
  NeutralFace
} from '../components/Faces';

const SplashScreen = () => {
  const navigate = useNavigate();

  // Redirect to Onboarding after 2.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex-1 w-full relative bg-surface overflow-hidden flex flex-col justify-center items-center">
      
      {/* Central Content */}
      <div className="z-10 flex flex-col items-center text-center">
        <h1 className="font-display text-[56px] leading-[1.1] font-bold tracking-tight text-text-primary">
          REDO.
        </h1>
        <p className="text-sm font-bold text-text-muted mt-1 uppercase tracking-widest">
          Master Mistakes
        </p>
      </div>

      {/* Scattered Faces */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left */}
        <JoyfulFace size="140" className="absolute top-[80px] left-[-20px] -rotate-12 opacity-100" />
        
        {/* Top Right */}
        <HappyFace size="120" className="absolute top-[40px] right-[10px] rotate-[15deg] opacity-100" />

        {/* Middle Left */}
        <SensitiveFace size="150" className="absolute top-[280px] left-[-40px] -rotate-[8deg] opacity-100" />

        {/* Middle Right */}
        <AngryFace size="160" className="absolute top-[320px] right-[-30px] rotate-[12deg] opacity-100" />

        {/* Bottom Left */}
        <InsecureFace size="130" className="absolute bottom-[120px] left-[10px] -rotate-[15deg] opacity-100" />

        {/* Bottom Right */}
        <ConfusedFace size="140" className="absolute bottom-[80px] right-[-20px] rotate-[10deg] opacity-100" />
        
        {/* Bottom Center */}
        <NeutralFace size="110" className="absolute bottom-[20px] left-[50%] -translate-x-1/2 rotate-6 opacity-100" />
      </div>

    </div>
  );
};

export default SplashScreen;
