import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "./instance";
import { jwtDecode } from "jwt-decode";

export const checkForToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      throw new Error("Token has expired");
    }

    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem("token", token);

    return decodedToken;
  } catch (error) {
    localStorage.removeItem("token");
    throw error;
  }
};
export const register = createAsyncThunk(
  "register/createUser",
  async (userInfo) => {
    try {
      const formData = new FormData();

      for (const [key, value] of Object.entries(userInfo)) {
        formData.append(key, value);
      }

      const response = await instance.post("/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = response.data;
      const user = checkForToken(data.token);
      return user;
    } catch (error) {
      throw error;
    }
  }
);

export const login = createAsyncThunk("login/fetchUser", async (info) => {
  try {
    const response = await instance.post("/users/login", info, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    const user = checkForToken(data.token);

    return user;
  } catch (error) {
    throw error;
  }
});
export const getCompany = createAsyncThunk("getCompany/fetchUser", async () => {
  try {
    const response = await instance.get("/users/company", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;

    return data;
  } catch (error) {
    throw error;
  }
});
export const getCompanyDetails = createAsyncThunk(
  "getCompanyDetails/fetchUser",
  async (id) => {
    try {
      const response = await instance.get(`/users/Details/${id}`, {
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

export const updateUser = createAsyncThunk(
  "updateUser/fetchUser",
  async (info) => {
    try {
      const formData = new FormData();

      for (const [key, value] of Object.entries(info)) {
        formData.append(key, value);
      }

      const response = await instance.put("/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = response.data;
      const user = checkForToken(data.token);

      return user;
    } catch (error) {
      throw error;
    }
  }
);

export const role = createAsyncThunk("getRole", async () => {
  try {
    const response = await instance.get("/role");
    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
});

export const getPhone = createAsyncThunk("getPhoneCode", async () => {
  try {
    const response = await instance.get("/phone");
    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
});
export const getCity = createAsyncThunk("getCity", async () => {
  try {
    const response = await instance.get("/City");
    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
});

export const setLocation = createAsyncThunk(
  "location/fetchUser",
  async (info) => {
    try {
      const response = await instance.post("/location", info, {
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
export const getLocation = createAsyncThunk(
  "getMyLocation/fetchUser",
  async () => {
    try {
      const response = await instance.get("/location", {
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
