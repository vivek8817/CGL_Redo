import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../store';
import { loginUser } from '../store/authSlice';
import ForgotPasswordModal from '../components/ForgotPasswordModal';

const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  // 1. Pull the loading and error state straight from our Redux slice!
  const { loading, error } = useSelector((state: RootState) => state.auth);
  
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  
  // 2. Add State for the inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 3. Dispatch the Thunk! 
    // Notice we pass 'password' as 'passwordHash' because that's what our backend expects.
    const resultAction = await dispatch(loginUser({ email, password: password }));
    
    // 4. If the thunk succeeded (got the 200 OK from backend), navigate!
    if (loginUser.fulfilled.match(resultAction)) {
      navigate('/home');
    }
  };

  return (
    <div className="flex-1 w-full bg-surface overflow-hidden flex flex-col">
      <div className="pt-24 px-card-pad pb-8">
        <h1 className="font-display text-[48px] font-bold tracking-tight text-text-primary leading-[1.05]">
          Welcome<br />Back.
        </h1>
        <p className="text-sm font-bold text-text-muted mt-2">
          Log in to continue your revision streak.
        </p>
      </div>

      <form onSubmit={handleLogin} className="flex-1 flex flex-col px-card-pad">
        <div className="flex flex-col gap-4 mb-4">
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-surface-hover rounded-sm px-4 py-4 text-base font-bold text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-text-primary"
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-surface-hover rounded-sm px-4 py-4 text-base font-bold text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-text-primary"
            required
          />
        </div>

        {/* 5. Show error message if login failed */}
        {error && (
          <p className="text-red-500 font-bold text-sm mb-4 text-center">{error}</p>
        )}

        <button 
          type="button" 
          onClick={() => setIsForgotOpen(true)}
          className="text-sm font-bold text-text-muted text-right mb-8 hover:text-text-primary transition-colors active:scale-95"
        >
          Forgot Password?
        </button>

        <button 
          type="submit"
          disabled={loading} // Disable button while loading
          className="w-full py-4 rounded-sm font-bold text-lg shadow-lg active:scale-95 transition-all bg-text-primary text-text-inverse mb-6 flex justify-center items-center disabled:opacity-50"
        >
          {loading ? 'Logging In...' : 'Log In'}
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
