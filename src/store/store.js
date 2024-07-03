import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/auth";
import carsSlice from "./slice/car";
import reviewsSlice from "./slice/reviews";

const store = configureStore({
  reducer: {
    auth: authSlice,
    cars: carsSlice,
    reviews: reviewsSlice,
  },
  devTools: true,
});

export default store;
