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
    addwishlist(state: WishlistState, action: { payload: Product }) {
      if (!state.items.some((item) => item.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    removewishlist(state: WishlistState, action: { payload: Product }) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addwishlist, removewishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
