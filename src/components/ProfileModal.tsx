import React from 'react';
import BottomSheet from './BottomSheet';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Profile">
      <div className="flex flex-col items-center gap-4 py-4">
        <div className="w-24 h-24 rounded-full bg-border overflow-hidden">
          <img
            src="https://api.dicebear.com/7.x/notionists/svg?seed=Vivek&backgroundColor=e5e7eb"
            alt="User Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-2xl font-bold text-text-primary">Vivek Ahirwar</h3>
        <p className="text-sm font-semibold text-text-muted">Targeting CGL 2026</p>
        
        <div className="w-full bg-surface-hover rounded-sm p-card-pad flex justify-between mt-4">
          <div className="flex flex-col items-center flex-1">
            <span className="text-lg font-bold text-text-primary">34</span>
            <span className="text-xs text-text-muted uppercase font-bold tracking-wider">Days Streak</span>
          </div>
          <div className="w-px h-10 bg-border"></div>
          <div className="flex flex-col items-center flex-1">
            <span className="text-lg font-bold text-text-primary">12</span>
            <span className="text-xs text-text-muted uppercase font-bold tracking-wider">Chapters</span>
          </div>
        </div>
      </div>
    </BottomSheet>
  );
};

export default ProfileModal;
