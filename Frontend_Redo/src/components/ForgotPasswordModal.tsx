import React from 'react';
import BottomSheet from './BottomSheet';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Reset Password">
      <div className="flex flex-col gap-4 py-4">
        <p className="text-sm font-bold text-text-muted">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        
        <input 
          type="email" 
          placeholder="Email Address" 
          className="w-full bg-surface-hover rounded-sm px-4 py-4 text-base font-bold text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-text-primary"
        />

        <button 
          onClick={onClose}
          className="w-full py-4 mt-2 rounded-sm font-bold text-lg shadow-lg active:scale-95 transition-all bg-text-primary text-text-inverse flex justify-center items-center"
        >
          Send Reset Link
        </button>
      </div>
    </BottomSheet>
  );
};

export default ForgotPasswordModal;
