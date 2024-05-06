import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

const presistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  cart: cartReducer,
});

const persistedReducer = persistReducer(presistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false });
  },
});
