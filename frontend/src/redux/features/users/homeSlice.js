import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const findByUser = createAsyncThunk(
  "homes/findByUser",
  async ({ userId, page = 1 }, thunkAPI) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/home/find-by-user/${userId}?page=${page}`
      );

      const { homes, nextPage } = res.data;

      return { homes, nextPage };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
    }
  }
);

export const updateUsers = createAsyncThunk(
  "homes/updateUsers",
  async ({ homeId, userIds }, thunkAPI) => {
    try {
      const data = { homeId, userIds };

      const res = await axios.put(`${BASE_URL}/api/home/update-users`, data);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
    }
  }
);

const initialState = {
  homes: [],
  selectedHome: null,
  page: 1,
  nextPage: null,
  prevPage: null,
  isLoading: false,
  error: undefined,
};

const homeSlice = createSlice({
  name: "homes",
  initialState,
  reducers: {
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    selectHome: (state, { payload }) => {
      state.selectedHome = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Find By User
      .addCase(findByUser.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(findByUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.homes = payload.homes;
        state.nextPage = payload.nextPage;
        state.prevPage = state.page > 1 ? state.page - 1 : null;
      })
      .addCase(findByUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      // Update Users
      .addCase(updateUsers.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(updateUsers.fulfilled, (state, { _payload }) => {
        state.isLoading = false;
      })
      .addCase(updateUsers.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const { changePage, selectHome } = homeSlice.actions;

export default homeSlice.reducer;
