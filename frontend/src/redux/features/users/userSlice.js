import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const findAllUsers = createAsyncThunk(
  "users/findAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/user/find-all`);

      return res.data.users;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const findByHome = createAsyncThunk(
  "users/findByHome",
  async (homeId, thunkAPI) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/user/find-by-home/${homeId}`
      );
      return res.data.users;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  users: [],
  selectedUser: null,
  usersByHome: [],
  isLoading: false,
  error: undefined,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    selectUser: (state, { payload }) => {
      state.selectedUser = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Users
      .addCase(findAllUsers.pending, (state) => {
        state.error = undefined;
      })
      .addCase(findAllUsers.fulfilled, (state, { payload }) => {
        state.users = payload;
      })
      .addCase(findAllUsers.rejected, (state, { payload }) => {
        state.error = payload;
      })
      // Get Users By Home
      .addCase(findByHome.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(findByHome.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.usersByHome = payload.map((u) => u.user_id);
      })
      .addCase(findByHome.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const { selectUser } = userSlice.actions;

export default userSlice.reducer;
