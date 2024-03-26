import { configureStore, combineReducers } from "@reduxjs/toolkit";
import UserSlice from "./services/wallet/UserSlice";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";
const persistConfig = {
  key: "root",
  storage,
  // Optionally, you can choose to only persist specific parts of the state
  // whitelist: ['user'], // Only persist the user reducer
};

// Use combineReducers to combine reducers, required for persisting multiple reducers
const rootReducer = combineReducers({
  user: UserSlice,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
});

// Export the configured persistor
export const persistor = persistStore(store);
