import { configureStore } from '@reduxjs/toolkit';
import subjectsReducer from './subjectsSlice';
import streakReducer from './streakSlice';

export const store = configureStore({
  reducer: {
    subjects: subjectsReducer,
    streak: streakReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
