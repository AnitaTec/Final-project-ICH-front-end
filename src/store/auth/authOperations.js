import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authApi from "../../shared/api/auth-api.js";

export const registerUser = createAsyncThunk(
  "register",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await authApi.register(payload);
      return data;
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message;

      return rejectWithValue({
        email: msg.includes("Email") ? msg : "",
        username: msg.includes("Username") ? msg : "",
        password: msg.includes("Password") ? msg : "",
      });
    }
  }
);

export const loginUser = createAsyncThunk(
  "login",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await authApi.login(payload);
      return data;
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message;

      return rejectWithValue({
        email: msg.includes("Email") ? msg : "",
        username: msg.includes("Username") ? msg : "",
        password: msg.includes("Password") ? msg : "",
      });
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "current",
  async (__dirname, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const data = await authApi.getCurrent(auth.accessToken);
      return data;
    } catch (error) {
      return rejectWithValue({
        email: error?.response?.data.message || error?.message,
      });
    }
  }
);
