import { createSlice } from "@reduxjs/toolkit";
import {
  createCarDetailsCar,
  createNewCar,
  getCarCompany,
  getCarType,
  getCars,
  getCarsByCompany,
  getCarsDetails,
  getMyCompanyCars,
  getSingleCars,
} from "../API/car";
const initialState = {
  carCompany: { data: [], isLoading: true, error: null },
  carType: { data: [], isLoading: true, error: null },
  cars: { data: [], isLoading: true, error: null },
  carsByCompany: { data: [], isLoading: true, error: null },
  singleCar: { data: null, isLoading: true, error: null },
  carsCard: { data: [], SportData: [], isLoading: true, error: null },
  createCar: { isLoading: false, isSuccess: false, error: null },
  createCarDetails: { isLoading: false, isSuccess: false, error: null },
  myCompanyCar: { data: [], isLoading: true, error: null },
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    resetCreateCarState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCarCompany.pending, (state, action) => {
        state.carCompany.isLoading = true;
      })
      .addCase(getCarCompany.fulfilled, (state, action) => {
        state.carCompany.isLoading = false;

        state.carCompany.data = action.payload;
      })
      .addCase(getCarCompany.rejected, (state, action) => {
        state.carCompany.isLoading = false;

        state.carCompany.error = action.error.message;
      })
      .addCase(getCarType.pending, (state, action) => {
        state.carType.isLoading = true;
      })
      .addCase(getCarType.fulfilled, (state, action) => {
        state.carType.isLoading = false;

        state.carType.data = action.payload;
      })
      .addCase(getCarType.rejected, (state, action) => {
        state.carType.isLoading = false;
        state.carType.error = action.error.message;
      })
      .addCase(getCars.pending, (state, action) => {
        state.cars.isLoading = true;
      })
      .addCase(getCars.fulfilled, (state, action) => {
        state.cars.isLoading = false;

        state.cars.data = action.payload;
      })
      .addCase(getCars.rejected, (state, action) => {
        state.cars.isLoading = false;
        state.cars.error = action.error.message;
      })
      .addCase(getCarsDetails.pending, (state, action) => {
        state.carsCard.isLoading = true;
      })
      .addCase(getCarsDetails.fulfilled, (state, action) => {
        state.carsCard.isLoading = false;
        const availableCars = action.payload.filter(
          (car) => car.status === true
        );
        const sportsCars = availableCars.filter((car) =>
          car.car.carTypes.some((type) => type.name === "Sports Car")
        );

        state.carsCard.SportData = sportsCars;
        state.carsCard.data = availableCars;
      })
      .addCase(getCarsDetails.rejected, (state, action) => {
        state.carsCard.isLoading = false;
        state.carsCard.error = action.error.message;
      })
      .addCase(getCarsByCompany.pending, (state, action) => {
        state.carsByCompany.isLoading = true;
      })
      .addCase(getCarsByCompany.fulfilled, (state, action) => {
        state.carsByCompany.isLoading = false;

        state.carsByCompany.data = action.payload;
      })
      .addCase(getCarsByCompany.rejected, (state, action) => {
        state.carsByCompany.isLoading = false;
        state.carsByCompany.error = action.error.message;
      })
      .addCase(createNewCar.pending, (state) => {
        state.createCar.isLoading = true;
        state.createCar.isSuccess = false;
        state.createCar.error = null;
      })
      .addCase(createNewCar.fulfilled, (state) => {
        state.createCar.isLoading = false;
        state.createCar.isSuccess = true;
        state.createCar.error = null;
      })
      .addCase(createNewCar.rejected, (state, action) => {
        state.createCar.isLoading = false;
        state.createCar.isSuccess = false;
        state.createCar.error = action.payload || "Could not create car";
      })
      .addCase(createCarDetailsCar.pending, (state) => {
        state.createCarDetails.isLoading = true;
        state.createCarDetails.isSuccess = false;
        state.createCarDetails.error = null;
      })
      .addCase(createCarDetailsCar.fulfilled, (state) => {
        state.createCarDetails.isLoading = false;
        state.createCarDetails.isSuccess = true;
        state.createCarDetails.error = null;
      })
      .addCase(createCarDetailsCar.rejected, (state, action) => {
        state.createCarDetails.isLoading = false;
        state.createCarDetails.isSuccess = false;
        state.createCarDetails.error = action.payload || "Could not create car";
      })
      .addCase(getSingleCars.pending, (state, action) => {
        state.singleCar.isLoading = true;
      })
      .addCase(getSingleCars.fulfilled, (state, action) => {
        state.singleCar.isLoading = false;

        state.singleCar.data = action.payload;
      })
      .addCase(getSingleCars.rejected, (state, action) => {
        state.singleCar.isLoading = false;

        state.singleCar.error = action.error.message;
      })
      .addCase(getMyCompanyCars.pending, (state, action) => {
        state.myCompanyCar.isLoading = true;
      })
      .addCase(getMyCompanyCars.fulfilled, (state, action) => {
        state.myCompanyCar.isLoading = false;

        state.myCompanyCar.data = action.payload;
      })
      .addCase(getMyCompanyCars.rejected, (state, action) => {
        state.myCompanyCar.isLoading = false;

        state.myCompanyCar.error = action.error.message;
      });
  },
});

export default carsSlice.reducer;
