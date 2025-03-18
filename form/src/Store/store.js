import { configureStore } from '@reduxjs/toolkit';
import workoutReducer from '../workoutSlice';
import calorieReducer from '../calorieSlice';

export const store = configureStore({
  reducer: {
    workouts: workoutReducer,
    calories: calorieReducer,
  },
});

