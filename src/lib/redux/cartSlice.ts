import { createSlice } from "@reduxjs/toolkit";
import { Product } from "./types";
interface CartState {
  items: Product[];
}
const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action: { payload: Product }) {
      const checkifExist = state.items.findIndex((item) => {
        return item.id === action.payload.id;
      });
      if (checkifExist === -1) {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      } else if (checkifExist !== -1) {
        state.items[checkifExist].quantity =
          (state.items[checkifExist].quantity || 0) + 1;
      }
    },
    remove(state, action: { payload: Product }) {
      const checkifExist = state.items.findIndex((item) => {
        return item.id === action.payload.id;
      });
      if (checkifExist !== -1) {
        state.items.splice(checkifExist, 1);
      }
    },
  },
});

export default cartSlice.reducer;
export const { add, remove } = cartSlice.actions;
