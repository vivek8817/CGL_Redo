import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import ForgotPasswordModal from '../components/ForgotPasswordModal';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [isForgotOpen, setIsForgotOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="flex-1 w-full bg-surface overflow-hidden flex flex-col">
      
      {/* Header Space */}
      <div className="pt-24 px-card-pad pb-8">
        <h1 className="font-display text-[48px] font-bold tracking-tight text-text-primary leading-[1.05]">
          Welcome<br />Back.
        </h1>
        <p className="text-sm font-bold text-text-muted mt-2">
          Log in to continue your revision streak.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="flex-1 flex flex-col px-card-pad">
        <div className="flex flex-col gap-4 mb-4">
          <input 
            type="email" 
            placeholder="Email Address" 
            className="w-full bg-surface-hover rounded-sm px-4 py-4 text-base font-bold text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-text-primary"
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full bg-surface-hover rounded-sm px-4 py-4 text-base font-bold text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-text-primary"
            required
          />
        </div>

        <button 
          type="button" 
          onClick={() => setIsForgotOpen(true)}
          className="text-sm font-bold text-text-muted text-right mb-8 hover:text-text-primary transition-colors active:scale-95"
        >
          Forgot Password?
        </button>

        <button 
          type="submit"
          className="w-full py-4 rounded-sm font-bold text-lg shadow-lg active:scale-95 transition-all bg-text-primary text-text-inverse mb-6 flex justify-center items-center"
        >
          Log In
        </button>

        <div className="mt-auto pb-12 text-center">
          <span className="text-sm font-bold text-text-muted">Don't have an account? </span>
          <button 
            type="button"
            onClick={() => navigate('/register')}
            className="text-sm font-bold text-text-primary underline decoration-2 underline-offset-4 active:scale-95 transition-transform"
          >
            Create one
          </button>
        </div>
      </form>

      <ForgotPasswordModal isOpen={isForgotOpen} onClose={() => setIsForgotOpen(false)} />

    </div>
  );
};

export default LoginScreen;
