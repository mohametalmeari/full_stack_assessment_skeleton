import { configureStore } from "@reduxjs/toolkit";
import users from "./features/users/userSlice";
import homes from "./features/users/homeSlice";

const store = configureStore({
  reducer: {
    users,
    homes,
  },
});

export default store;
