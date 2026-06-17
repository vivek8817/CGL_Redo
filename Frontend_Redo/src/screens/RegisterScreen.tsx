import React from 'react';
import { useNavigate } from 'react-router';

const RegisterScreen = () => {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="flex-1 w-full bg-surface overflow-hidden flex flex-col">
      
      {/* Header Space */}
      <div className="pt-24 px-card-pad pb-8">
        <h1 className="font-display text-[48px] font-bold tracking-tight text-text-primary leading-[1.05]">
          Create<br />Account.
        </h1>
        <p className="text-sm font-bold text-text-muted mt-2">
          Start mastering your mistakes today.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleRegister} className="flex-1 flex flex-col px-card-pad">
        <div className="flex flex-col gap-4 mb-8">
          <input 
            type="text" 
            placeholder="Full Name" 
            className="w-full bg-surface-hover rounded-sm px-4 py-4 text-base font-bold text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-text-primary"
            required
          />
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
          type="submit"
          className="w-full py-4 rounded-sm font-bold text-lg shadow-lg active:scale-95 transition-all bg-text-primary text-text-inverse mb-6 flex justify-center items-center"
        >
          Sign Up
        </button>

        <div className="mt-auto pb-12 text-center">
          <span className="text-sm font-bold text-text-muted">Already have an account? </span>
          <button 
            type="button"
            onClick={() => navigate('/login')}
            className="text-sm font-bold text-text-primary underline decoration-2 underline-offset-4 active:scale-95 transition-transform"
          >
            Log in
          </button>
        </div>
      </form>

    </div>
  );
};

export default RegisterScreen;
