import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { subjectsData } from '../data/subjects';
import {type Subject } from '../data/types';

export interface BookmarkedMCQ {
  mcqId: number;
  chapterId: string;
  subjectTitle: string;
  mcqText: string;
  correctAnswerText: string;
  explanation: string;
  timestamp: number;
}

// The initial state is the massive syllabus array we just built
const initialState: { subjects: Subject[], bookmarks: BookmarkedMCQ[] } = {
  subjects: subjectsData,
  bookmarks: [],
};

export const subjectsSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {
    // Action to update chapter progress when a quiz finishes
    updateChapterProgress: (state, action: PayloadAction<{ 
      chapterId: string; 
      attempted: number; 
      wrong: number; 
      progressLevel: 'Strong' | 'Improving' | 'Weak' | 'Not Started' 
    }>) => {
      const { chapterId, attempted, wrong, progressLevel } = action.payload;
      
      // Look through our state to find the chapter and update it
      for (const subject of state.subjects) {
        if (subject.chapters) {
          const chapter = subject.chapters.find(c => c.id === chapterId);
          if (chapter) {
            chapter.attempted = attempted;
            chapter.wrong = wrong;
            chapter.progressLevel = progressLevel;
            return; // Stop searching once found
          }
        } else if (subject.subSubjects) {
          for (const sub of subject.subSubjects) {
            const chapter = sub.chapters.find(c => c.id === chapterId);
            if (chapter) {
              chapter.attempted = attempted;
              chapter.wrong = wrong;
              chapter.progressLevel = progressLevel;
              return; // Stop searching once found
            }
          }
        }
      }
    },
    resetChapterProgress: (state, action: PayloadAction<string>) => {
      const chapterId = action.payload;
      for (const subject of state.subjects) {
        if (subject.chapters) {
          const chapter = subject.chapters.find(c => c.id === chapterId);
          if (chapter) {
            chapter.attempted = 0;
            chapter.wrong = 0;
            chapter.progressLevel = 'Not Started';
            return;
          }
        } else if (subject.subSubjects) {
          for (const sub of subject.subSubjects) {
            const chapter = sub.chapters.find(c => c.id === chapterId);
            if (chapter) {
              chapter.attempted = 0;
              chapter.wrong = 0;
              chapter.progressLevel = 'Not Started';
              return;
            }
          }
        }
      }
    },
    resetSubjectProgress: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      for (const subject of state.subjects) {
        if (subject.id === id && subject.chapters) {
          subject.chapters.forEach(c => {
            c.attempted = 0;
            c.wrong = 0;
            c.progressLevel = 'Not Started';
          });
          return;
        } else if (subject.subSubjects) {
          // Check if the ID matches a sub-subject or the parent subject
          if (subject.id === id) {
            subject.subSubjects.forEach(sub => {
              sub.chapters.forEach(c => {
                c.attempted = 0;
                c.wrong = 0;
                c.progressLevel = 'Not Started';
              });
            });
            return;
          } else {
            const sub = subject.subSubjects.find(s => s.id === id);
            if (sub) {
              sub.chapters.forEach(c => {
                c.attempted = 0;
                c.wrong = 0;
                c.progressLevel = 'Not Started';
              });
              return;
            }
          }
        }
      }
    },
    toggleBookmark: (state, action: PayloadAction<BookmarkedMCQ>) => {
      const { mcqId, chapterId } = action.payload;
      const existingIndex = state.bookmarks.findIndex(b => b.mcqId === mcqId && b.chapterId === chapterId);
      
      let isAdding = false;
      if (existingIndex >= 0) {
        state.bookmarks.splice(existingIndex, 1);
      } else {
        state.bookmarks.push(action.payload);
        isAdding = true;
      }

      // Update the chapter's bookmark count
      for (const subject of state.subjects) {
        if (subject.chapters) {
          const chapter = subject.chapters.find(c => c.id === chapterId);
          if (chapter) {
            chapter.bookmarked = isAdding ? (chapter.bookmarked || 0) + 1 : Math.max(0, (chapter.bookmarked || 0) - 1);
            return;
          }
        } else if (subject.subSubjects) {
          for (const sub of subject.subSubjects) {
            const chapter = sub.chapters.find(c => c.id === chapterId);
            if (chapter) {
              chapter.bookmarked = isAdding ? (chapter.bookmarked || 0) + 1 : Math.max(0, (chapter.bookmarked || 0) - 1);
              return;
            }
          }
        }
      }
    }
  }
});

export const { updateChapterProgress, resetChapterProgress, resetSubjectProgress, toggleBookmark } = subjectsSlice.actions;
export default subjectsSlice.reducer;
