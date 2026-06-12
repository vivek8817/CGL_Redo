import React from 'react';

interface FaceProps {
  className?: string;
  size?: number | string;
}

export const ExcitedFace: React.FC<FaceProps> = ({ className, size = "100%" }) => (
  <div className={className}>
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#FF8B72" />
      <path d="M 30 45 Q 35 52 42 45" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" />
      <path d="M 58 45 Q 65 52 70 45" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" />
      <path d="M 26.5 60 Q 50 70 73.5 60" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" />
    </svg>
  </div>
);

export const JoyfulFace: React.FC<FaceProps> = ({ className, size = 160 }) => (
  <div className={className}>
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 50 20 C 75 -5, 105 25, 80 50 C 105 75, 75 105, 50 80 C 25 105, -5 75, 20 50 C -5 25, 25 -5, 50 20 Z" fill="#FF70B8" />
      <path d="M 30 45 Q 35 42 42 45" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" />
      <path d="M 58 45 Q 65 42 70 45" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" />
      <path d="M 35 60 Q 50 85 65 60" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" />
    </svg>
  </div>
);

export const GuiltyFace: React.FC<FaceProps> = ({ className, size = 160 }) => (
  <div className={className}>
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 10 90 L 90 90 L 90 50 C 90 10, 10 10, 10 50 Z" fill="#FCBF10" />
      <circle cx="45" cy="65" r="12" fill="#FFF" />
      <circle cx="40" cy="62" r="4" fill="#111" />
      <circle cx="70" cy="65" r="10" fill="#FFF" />
      <circle cx="65" cy="62" r="3" fill="#111" />
      <line x1="35" y1="52" x2="50" y2="48" stroke="#111" strokeWidth="3" strokeLinecap="round" />
      <line x1="60" y1="52" x2="75" y2="48" stroke="#111" strokeWidth="3" strokeLinecap="round" />
    </svg>
  </div>
);

export const SensitiveFace: React.FC<FaceProps> = ({ className, size = 160 }) => (
  <div className={className} >
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 5 50 L 5 80 Q 5 95 20 95 L 80 95 Q 95 95 95 80 L 95 50 C 95 10, 5 10, 5 50 Z" fill="#0A8DFA" />
      <path d="M 30 55 Q 37 55 42 60" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" />
      <path d="M 58 60 Q 63 55 70 55" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="70" r="4" fill="#FFF" />
      <path d="M 32 66 L 35 70 L 29 70 Z" fill="#FFF" />
    </svg>
  </div>
);

export const AngryFace: React.FC<FaceProps> = ({ className, size = "100%" }) => (
  <div className={className}>
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="80" height="80" rx="20" fill="#FB4F0F" />
      <path d="M 22 43 L 50 51 L 78 43 A 14 14 0 0 1 50 51 A 14 14 0 0 1 22 43 Z" fill="#FFF" />
      <circle cx="38" cy="51" r="3.5" fill="#111" />
      <circle cx="62" cy="51" r="3.5" fill="#111" />
      <path d="M 35 76 Q 50 64 65 76" stroke="#111" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  </div>
);

export const HappyFace: React.FC<FaceProps> = ({ className, size = "100%" }) => (
  <div className={className}>
    <svg width={size} height={size} viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="80" height="80" rx="20" fill="#FFDE6A" />
      <path d="M 22 36 Q 34 26 44 34" stroke="#111" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 78 36 Q 66 26 56 34" stroke="#111" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="34" cy="51" r="4.5" fill="#111" />
      <circle cx="66" cy="51" r="4.5" fill="#111" />
      <path d="M 36 68 Q 50 78 64 68" stroke="#111" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </svg>
  </div>
);

export const NeutralFace: React.FC<FaceProps> = ({ className, size = "100%" }) => (
  <div className={className}>
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="80" height="80" rx="20" fill="#A3C6FA" />
      <path d="M 22 35 L 42 35" stroke="#111" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 58 35 L 78 35" stroke="#111" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="34" cy="51" r="4.5" fill="#111" />
      <circle cx="66" cy="51" r="4.5" fill="#111" />
    </svg>
  </div>
);

export const InsecureFace: React.FC<FaceProps> = ({ className, size = 160 }) => (
  <div className={className}>
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#FF7215" />
      <circle cx="35" cy="50" r="14" fill="#FFF" />
      <circle cx="30" cy="50" r="5" fill="#111" />
      <rect x="50" y="42" width="25" height="16" fill="#FFF" />
      <circle cx="55" cy="50" r="4" fill="#111" />
    </svg>
  </div>
);

export const ConfusedFace: React.FC<FaceProps> = ({ className, size = 160 }) => (
  <div className={className}>
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="#105AE1" />
      <circle cx="35" cy="50" r="18" fill="#FFF" />
      <circle cx="38" cy="50" r="6" fill="#111" />
      <circle cx="65" cy="50" r="15" fill="#FFF" />
      <g transform="translate(65, 50) scale(1) translate(-65, -50)">
        <path d="M 65 42 A 8 8 0 1 1 64 58 A 5 5 0 1 1 66 48 A 2 2 0 1 1 65 52" fill="none" stroke="#E65100" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  </div>
);