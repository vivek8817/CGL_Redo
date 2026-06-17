import { configureStore } from '@reduxjs/toolkit';
import subjectsReducer from './subjectsSlice';
import streakReducer from './streakSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    subjects: subjectsReducer,
    streak: streakReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
