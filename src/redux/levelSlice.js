import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  beginner: {
    '1': { completed: false, unlocked: true },
    '2': { completed: false, unlocked: false },
    '3': { completed: false, unlocked: false },
  },
  intermediate: {
    '1': { completed: false, unlocked: false },
    '2': { completed: false, unlocked: false },
    '3': { completed: false, unlocked: false },
  },
  advanced: {
    '1': { completed: false, unlocked: false },
    '2': { completed: false, unlocked: false },
    '3': { completed: false, unlocked: false },
  },
  progress: {
    beginnerCompleted: false,
    intermediateUnlocked: false,
    intermediateCompleted: false,
    advancedUnlocked: false,
  }
};

const levelSlice = createSlice({
  name: 'level',
  initialState,
  reducers: {
    completeLevel: (state, action) => {
      const { level, type } = action.payload;
      
      // Mark current level as completed
      state[type][level.toString()].completed = true;
      
      // Handle Beginner Level Progression
      if (type === 'beginner') {
        // Unlock next Beginner level
        const nextBeginnerLevel = (parseInt(level) + 1).toString();
        if (state.beginner[nextBeginnerLevel]) {
          state.beginner[nextBeginnerLevel].unlocked = true;
        }
        
        // Check if all Beginner levels are completed
        if (state.beginner['1'].completed && 
            state.beginner['2'].completed && 
            state.beginner['3'].completed) {
          state.progress.beginnerCompleted = true;
          state.progress.intermediateUnlocked = true;
          state.intermediate['1'].unlocked = true;
        }
      }
      
      // Handle Intermediate Level Progression
      if (type === 'intermediate') {
        // Unlock next Intermediate level
        const nextIntermediateLevel = (parseInt(level) + 1).toString();
        if (state.intermediate[nextIntermediateLevel]) {
          state.intermediate[nextIntermediateLevel].unlocked = true;
        }
        
        // Check if all Intermediate levels are completed
        if (state.intermediate['1'].completed && 
            state.intermediate['2'].completed && 
            state.intermediate['3'].completed) {
          state.progress.intermediateCompleted = true;
          state.progress.advancedUnlocked = true;
          state.advanced['1'].unlocked = true;
        }
      }
      
      // Handle Advanced Level Progression
      if (type === 'advanced') {
        // Unlock next Advanced level
        const nextAdvancedLevel = (parseInt(level) + 1).toString();
        if (state.advanced[nextAdvancedLevel]) {
          state.advanced[nextAdvancedLevel].unlocked = true;
        }
      }
    },
  },
});

export const { completeLevel } = levelSlice.actions;
export default levelSlice.reducer;