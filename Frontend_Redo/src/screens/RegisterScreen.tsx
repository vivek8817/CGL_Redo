import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../store';
import { registerUser } from '../store/authSlice';

const RegisterScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  // Store what the user types in state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Dispatch our new registration API call!
    const resultAction = await dispatch(registerUser({ username, email, password }));
    
    // Only navigate to home if it was successful
    if (registerUser.fulfilled.match(resultAction)) {
      navigate('/home');
    }
  };

  return (
    <div className="flex-1 w-full bg-surface overflow-hidden flex flex-col">
      <div className="pt-24 px-card-pad pb-8">
        <h1 className="font-display text-[48px] font-bold tracking-tight text-text-primary leading-[1.05]">
          Create<br />Account.
        </h1>
        <p className="text-sm font-bold text-text-muted mt-2">
          Start mastering your mistakes today.
        </p>
      </div>

      <form onSubmit={handleRegister} className="flex-1 flex flex-col px-card-pad">
        <div className="flex flex-col gap-4 mb-4">
          <input 
            type="text" 
            placeholder="Full Name" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-surface-hover rounded-sm px-4 py-4 text-base font-bold text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-text-primary"
            required
          />
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

        {/* Show error message if backend rejects registration */}
        {error && (
          <p className="text-red-500 font-bold text-sm mb-4 text-center">{error}</p>
        )}

        <button 
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-sm font-bold text-lg shadow-lg active:scale-95 transition-all bg-text-primary text-text-inverse mb-6 flex justify-center items-center disabled:opacity-50 mt-4"
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
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
