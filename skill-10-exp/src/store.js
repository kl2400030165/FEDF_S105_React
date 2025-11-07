import { configureStore } from "@reduxjs/toolkit";
import feedbackReducer from "./features/feedbackSlice";

export const store = configureStore({
  reducer: {
    feedback: feedbackReducer,
  },
});