import { createSlice } from "@reduxjs/toolkit";
import {
  getCity,
  getCompany,
  getCompanyDetails,
  getLocation,
  getPhone,
  login,
  register,
  role,
  updateUser,
} from "../API/auth";
import { getCarsByCompanyDetails } from "../API/car";
const initialState = {
  user: { data: null, isLoading: false, error: null },
  companyCard: { data: [], isLoading: false, error: null },
  companyDetails: { data: [], isLoading: false, error: null },
  carCardForCompanyDetails: { data: [], isLoading: false, error: null },
  role: { data: [], isLoading: true, error: null },
  phone: { data: [], isLoading: true, error: null },
  city: { data: [], isLoading: true, error: null },
  location: { data: null, isLoading: true, error: null },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem("token");
      state.user.data = null;
      state.user.error = null;
    },
    getUser(state, action) {
      state.user.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state, action) => {
        state.user.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user.isLoading = false;

        state.user.data = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.user.isLoading = false;

        state.user.error = action.error.message;
      })
      .addCase(login.pending, (state, action) => {
        state.user.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user.isLoading = false;

        state.user.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.user.isLoading = false;
        state.user.error = action.error.message;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.user.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user.isLoading = false;

        state.user.data = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.user.isLoading = false;
        state.user.error = action.error.message;
      })
      .addCase(role.pending, (state, action) => {
        state.role.isLoading = true;
      })
      .addCase(role.fulfilled, (state, action) => {
        state.role.isLoading = false;

        state.role.data = action.payload;
      })
      .addCase(role.rejected, (state, action) => {
        state.role.isLoading = false;
        state.role.error = action.error.message;
      })
      .addCase(getPhone.pending, (state, action) => {
        state.phone.isLoading = true;
      })
      .addCase(getPhone.fulfilled, (state, action) => {
        state.phone.isLoading = false;

        state.phone.data.push(...action.payload);
      })
      .addCase(getPhone.rejected, (state, action) => {
        state.phone.isLoading = false;
        state.phone.error = action.error.message;
      })
      .addCase(getCity.pending, (state, action) => {
        state.city.isLoading = true;
      })
      .addCase(getCity.fulfilled, (state, action) => {
        state.city.isLoading = false;

        state.city.data = action.payload;
      })
      .addCase(getCity.rejected, (state, action) => {
        state.city.isLoading = false;
        state.city.error = action.error.message;
      })
      .addCase(getLocation.pending, (state, action) => {
        state.location.isLoading = true;
      })
      .addCase(getLocation.fulfilled, (state, action) => {
        state.location.isLoading = false;
        state.location.data = action.payload[0];
      })
      .addCase(getLocation.rejected, (state, action) => {
        state.location.isLoading = false;
        state.location.error = action.error.message;
      })
      .addCase(getCompany.pending, (state, action) => {
        state.companyCard.isLoading = true;
      })
      .addCase(getCompany.fulfilled, (state, action) => {
        state.companyCard.isLoading = false;

        state.companyCard.data = action.payload;
      })
      .addCase(getCompany.rejected, (state, action) => {
        state.companyCard.isLoading = false;
        state.companyCard.error = action.error.message;
      })
      .addCase(getCompanyDetails.pending, (state, action) => {
        state.companyDetails.isLoading = true;
      })
      .addCase(getCompanyDetails.fulfilled, (state, action) => {
        state.companyDetails.isLoading = false;

        state.companyDetails.data = action.payload;
      })
      .addCase(getCompanyDetails.rejected, (state, action) => {
        state.companyDetails.isLoading = false;
        state.companyDetails.error = action.error.message;
      })
      .addCase(getCarsByCompanyDetails.pending, (state, action) => {
        state.carCardForCompanyDetails.isLoading = true;
      })
      .addCase(getCarsByCompanyDetails.fulfilled, (state, action) => {
        state.carCardForCompanyDetails.isLoading = false;

        state.carCardForCompanyDetails.data = action.payload;
      })
      .addCase(getCarsByCompanyDetails.rejected, (state, action) => {
        state.carCardForCompanyDetails.isLoading = false;
        state.carCardForCompanyDetails.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
