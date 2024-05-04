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
      // const checkifExist = state.items.filter(
      //   (item) => item.id === action.payload.id
      // );
      // if (!checkifExist) {
      state.items.push({ ...action.payload, quantity: 1 });
      // } else
      //   state.items.map((item) => {
      //     return { ...item, quantity: item.quantity && item.quantity + 1 };
      //   });
    },
  },
});

export default cartSlice.reducer;
export const { add } = cartSlice.actions;
