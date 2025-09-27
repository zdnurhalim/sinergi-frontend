import { configureStore } from '@reduxjs/toolkit';
import jobRequirementReducer from './jobRequirementSlice';
import authReducer from "@/store/AuthSlice";

export const store = configureStore({
  reducer: {
    jobRequirement: jobRequirementReducer,
    auth: authReducer,
  },
});