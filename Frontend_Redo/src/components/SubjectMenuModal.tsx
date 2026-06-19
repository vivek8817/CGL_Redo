import React from "react";
import BottomSheet from "./BottomSheet";
import { useDispatch, useSelector } from "react-redux";
import resetSubjectProgress from "../store/subjectsSlice";
import { type RootState, type AppDispatch } from "../store";
import { resetProgress } from "../store/streakSlice";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  subjectId: string;
}

const SubjectMenuModal: React.FC<Props> = ({ isOpen, onClose, subjectId }) => {
   const dispatch = useDispatch<AppDispatch>();
  const subjectsData = useSelector((state: RootState) => state.subjects.subjects);

  const handleReset = () => {
    let targetSubject: any = subjectsData.find(s => s.id === subjectId);
    if (!targetSubject) {
      for (const s of subjectsData) {
        if (s.subSubjects) {
          const sub = s.subSubjects.find((sub: any) => sub.id === subjectId);
          if (sub) {
            targetSubject = sub;
            break;
          }
        }
      }
    }

    if (targetSubject) {
      let chapterIds: string[] = [];
      if (targetSubject.chapters && targetSubject.chapters.length > 0) {
        chapterIds = targetSubject.chapters.map((c: any) => c.id);
      } else if (targetSubject.subSubjects) {
        chapterIds = targetSubject.subSubjects.flatMap((sub: any) => 
          sub.chapters ? sub.chapters.map((c: any) => c.id) : []
        );
      }
      
      if (chapterIds.length > 0) {
        dispatch(resetProgress(chapterIds));
      }
    }
    onClose();
  };


  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Subject Options">
      <div className="flex flex-col gap-2 py-2">
        <button
          onClick={handleReset}
          className="w-full flex items-center justify-between p-4 bg-widget-sleep-bg/20 rounded-sm active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-widget-sleep-bg/40 flex items-center justify-center">
              <iconify-icon
                icon="solar:refresh-circle-bold"
                width="24"
                className="text-widget-sleep-chart"
              ></iconify-icon>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-bold text-widget-sleep-chart">
                Reset Subject Progress
              </span>
              <span className="text-xs font-semibold text-text-muted">
                Clear all progress in this subject
              </span>
            </div>
          </div>
        </button>
      </div>
    </BottomSheet>
  );
};

export default SubjectMenuModal;
