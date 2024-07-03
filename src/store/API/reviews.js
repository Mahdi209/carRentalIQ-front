import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "./instance";

export const GetCompanyComment = createAsyncThunk(
  "getCompanyComment/fetchCar",
  async (id) => {
    try {
      const response = await instance.get(`/reviews/companyReviews/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const addCompanyReview = createAsyncThunk(
  "reviews/fetchCar",
  async (reviewInfo, { rejectWithValue }) => {
    try {
      const response = await instance.post("/reviews/", reviewInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      // Improved error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        return rejectWithValue(
          error.response.data.message || "Failed to add review"
        );
      } else if (error.request) {
        // The request was made but no response was received
        return rejectWithValue("No response from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        return rejectWithValue(error.message);
      }
    }
  }
);
