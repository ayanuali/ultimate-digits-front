import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./services/wallet/UserSlice";
export const store = configureStore({
  reducer: {
    user: UserSlice,
  },
});
