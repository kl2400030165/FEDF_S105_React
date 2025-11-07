import { createSlice } from "@reduxjs/toolkit";

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: [],
  reducers: {
    addFeedback: (state, action) => {
      state.push(action.payload); // adds new feedback object
    },
  },
});

export const { addFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;