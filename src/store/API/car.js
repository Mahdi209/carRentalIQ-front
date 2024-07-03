import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "./instance";

export const getCarCompany = createAsyncThunk(
  "car/fetchAllCompany",
  async () => {
    try {
      const response = await instance.get("/carCompany/");
      const data = response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const getCarType = createAsyncThunk("car/fetchAllType", async () => {
  try {
    const response = await instance.get("/carType/");
    const data = response.data;

    return data;
  } catch (error) {
    throw error;
  }
});
export const getCars = createAsyncThunk("car/fetchCar", async () => {
  try {
    const response = await instance.get("/car/");
    const data = response.data;

    return data;
  } catch (error) {
    throw error;
  }
});
export const getCarsDetails = createAsyncThunk(
  "carDetails/fetchCar",
  async () => {
    try {
      const response = await instance.get("/carDetails/");
      const data = response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }
);
export const getCarsByCompany = createAsyncThunk(
  "getCarsByCompany/fetchCar",
  async (id) => {
    try {
      const response = await instance.get(`/car/CompanyCar/${id}`);
      const data = response.data;
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const createNewCar = createAsyncThunk(
  "createCar/fetchCar",
  async (info) => {
    try {
      const response = await instance.post("/car/", info, {
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

export const createCarDetailsCar = createAsyncThunk(
  "createCarDetails/fetchCar",
  async (info) => {
    try {
      const formData = new FormData();

      for (const [key, value] of Object.entries(info)) {
        formData.append(key, value);
      }

      const response = await instance.post("/carDetails/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const getSingleCars = createAsyncThunk(
  "SingleCar/fetchCar",
  async (id) => {
    try {
      const response = await instance.get(`/carDetails/${id}`);
      const data = response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }
);
export const getCarsByCompanyDetails = createAsyncThunk(
  "getCarsByCompanyDetails/fetchCar",
  async (id) => {
    try {
      const response = await instance.get(`/carDetails/company/${id}`);
      const data = response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }
);
export const getMyCompanyCars = createAsyncThunk(
  "myCompanyCar/fetchCar",
  async () => {
    try {
      const response = await instance.get(`/carDetails/MyCar`);
      const data = response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }
);
export const updateCars = createAsyncThunk(
  "updateCar/fetchCar",
  async ({ id, carData }) => {
    try {
      const response = await instance.put(`/carDetails/${id}`, carData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
