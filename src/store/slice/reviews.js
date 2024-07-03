import { createSlice } from "@reduxjs/toolkit";
import { GetCompanyComment } from "../API/reviews";

const initialState = {
  companyReview: { data: [], isLoading: true, error: null },
};

const reviewsSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetCompanyComment.pending, (state, action) => {
        state.companyReview.isLoading = true;
      })
      .addCase(GetCompanyComment.fulfilled, (state, action) => {
        state.companyReview.isLoading = false;

        state.companyReview.data = action.payload;
      })
      .addCase(GetCompanyComment.rejected, (state, action) => {
        state.companyReview.isLoading = false;

        state.companyReview.error = action.error.message;
      });
  },
});

export default reviewsSlice.reducer;
