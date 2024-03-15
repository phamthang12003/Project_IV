import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import authAPI from "../../api/authAPI";
import { sleep } from "../../utils/sleep";
import { appActions } from "../app/appSlice";

export const fetchLogin = createAsyncThunk(
  "auth/login",
  async (data = {}, { rejectWithValue, dispatch }) => {
    try {
      dispatch(appActions.setLoading(true));

      const response = await authAPI.post(data, "/Login");

      await sleep();

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      toast.success("Login successfully");

      return response;
    } catch (error) {
      toast.error(error?.response?.data?.message ?? error?.message);
      return rejectWithValue(error?.response?.data?.message ?? error?.message);
    } finally {
      dispatch(appActions.setLoading(false));
    }
  }
);

export const fetchGetCurrentUser = createAsyncThunk(
  "auth/fetchGetCurrentUser",
  async (data = {}, { rejectWithValue, dispatch }) => {
    try {
      dispatch(appActions.setLoading(true));

      const response = await authAPI.get({ params: {}, prefix: "/CurrentUser" });

      return response;
    } catch (error) {
      toast.error(error?.response?.data?.message ?? error?.message);
      return rejectWithValue(error?.response?.data?.message ?? error?.message);
    } finally {
      dispatch(appActions.setLoading(false));
    }
  }
);

export const fetchLogout = createAsyncThunk(
  "auth/fetchLogout",
  async (data = {}, { rejectWithValue, dispatch }) => {
    try {
      localStorage.removeItem("refreshToken");

      dispatch(appActions.setLoading(true));

      const response = await authAPI.post({}, "/Logout");

      return response;
    } catch (error) {
      toast.error(error?.response?.data?.message ?? error?.message);
      return rejectWithValue(error?.response?.data?.message ?? error?.message);
    } finally {
      dispatch(appActions.setLoading(false));
    }
  }
);

export const fetchSignUp = createAsyncThunk(
  "auth/fetchSignUp",
  async (data = {}, { rejectWithValue, dispatch }) => {
    try {
      dispatch(appActions.setLoading(true));

      const response = await authAPI.post(data, "/Register");

      toast.success(response.message);

      return response;
    } catch (error) {
      toast.error(error?.response?.data?.message ?? error?.message);
      return rejectWithValue(error?.response?.data?.message ?? error?.message);
    } finally {
      dispatch(appActions.setLoading(false));
    }
  }
);
