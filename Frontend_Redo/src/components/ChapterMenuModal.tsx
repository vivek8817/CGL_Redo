import React from 'react';
import BottomSheet from './BottomSheet';
import { useDispatch } from 'react-redux';
import  resetChapterProgress  from '../store/subjectsSlice';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  chapterId: string;
}

const ChapterMenuModal: React.FC<Props> = ({ isOpen, onClose, chapterId }) => {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetChapterProgress(chapterId));
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Chapter Options">
      <div className="flex flex-col gap-2 py-2">
        <button 
          onClick={handleReset}
          className="w-full flex items-center justify-between p-4 bg-widget-sleep-bg/20 rounded-sm active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-widget-sleep-bg/40 flex items-center justify-center">
              <iconify-icon icon="solar:refresh-circle-bold" width="24" className="text-widget-sleep-chart"></iconify-icon>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-bold text-widget-sleep-chart">Reset Progress</span>
              <span className="text-xs font-semibold text-text-muted">Clear attempts and wrong count</span>
            </div>
          </div>
        </button>
      </div>
    </BottomSheet>
  );
};

export default ChapterMenuModal;
