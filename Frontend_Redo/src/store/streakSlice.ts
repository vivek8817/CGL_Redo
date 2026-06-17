import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';




// The new Thunk to fetch User Dashboard from your backend!
export const fetchDashboard = createAsyncThunk('streak/fetchDashboard', async () => {
  const response = await api.get('/progress/dashboard');
  return response.data;
});

// We store activityLog as a record (dictionary) for easy calendar lookups
const initialState: { activityLog: Record<string, any>, bookmarks: any[], chapterProgress: any[], loading: boolean } = {
  activityLog: {},
  bookmarks: [],
  chapterProgress: [],
  loading: false
};


export const streakSlice = createSlice({
  name: 'streak',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        
        // The backend gives us an Array of activities. 
        // We convert it into a Record mapped by the 'date' string so the Calendar can easily read it!
        const logMap: Record<string, any> = {};
        if (action.payload.dailyActivity) {
          action.payload.dailyActivity.forEach((activity: any) => {
            logMap[activity.date] = {
              date: activity.date,
              questionsAttempted: activity.attempted,
              correctAnswers: activity.correct,
            };
          });
        }
        state.activityLog = logMap;
        state.bookmarks = action.payload.bookmarks || [];
        state.chapterProgress = action.payload.chapterProgress || [];
      });
  }
});

export default streakSlice.reducer;
