import { createSlice } from "@reduxjs/toolkit";
import { Product } from "./types";

interface WishlistState {
  items: Product[];
}

const initailState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initailState,
  reducers: {
    add(state: WishlistState, action: { payload: Product }) {
      if (!state.items.some((item) => item.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    remove(state: WishlistState, action: { payload: Product }) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { add, remove } = wishlistSlice.actions;
export default wishlistSlice.reducer;
