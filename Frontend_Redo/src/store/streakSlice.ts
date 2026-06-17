import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface DailyActivity {
  date: string; // Format: YYYY-MM-DD
  questionsAttempted: number;
  correctAnswers: number;
  subjectsStudied: string[];
}

const getTodayString = () => {
  const d = new Date();
  // Ensure we get local YYYY-MM-DD
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

// Seed some initial data so the calendar looks good initially
const generateMockData = () => {
  const log: Record<string, DailyActivity> = {};
  const today = new Date();
  
  for (let i = 1; i <= 28; i++) {
    const d = new Date(today.getFullYear(), today.getMonth(), i);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    
    // Don't mock future dates
    if (d > today) continue;

    // Randomize activity for past dates
    const rand = Math.random();
    if (rand > 0.3) {
      // Present (>= 20 questions)
      log[dateStr] = {
        date: dateStr,
        questionsAttempted: Math.floor(Math.random() * 30) + 20, // 20 to 49
        correctAnswers: Math.floor(Math.random() * 20) + 10,
        subjectsStudied: ['Physics', 'History']
      };
    } else if (rand > 0.1) {
      // Mediocre (< 20 questions)
      log[dateStr] = {
        date: dateStr,
        questionsAttempted: Math.floor(Math.random() * 15) + 1, // 1 to 15
        correctAnswers: Math.floor(Math.random() * 5),
        subjectsStudied: ['Biology']
      };
    }
    // else Absent (no entry)
  }
  return log;
};

const initialState: { activityLog: Record<string, DailyActivity> } = {
  activityLog: generateMockData()
};

export const streakSlice = createSlice({
  name: 'streak',
  initialState,
  reducers: {
    logActivity: (state, action: PayloadAction<{ attempted: number; correct: number; subjectTitle: string }>) => {
      const { attempted, correct, subjectTitle } = action.payload;
      const today = getTodayString();

      if (!state.activityLog[today]) {
        state.activityLog[today] = {
          date: today,
          questionsAttempted: 0,
          correctAnswers: 0,
          subjectsStudied: []
        };
      }

      const todayActivity = state.activityLog[today];
      todayActivity.questionsAttempted += attempted;
      todayActivity.correctAnswers += correct;
      
      if (!todayActivity.subjectsStudied.includes(subjectTitle)) {
        todayActivity.subjectsStudied.push(subjectTitle);
      }
    }
  }
});

export const { logActivity } = streakSlice.actions;
export default streakSlice.reducer;
