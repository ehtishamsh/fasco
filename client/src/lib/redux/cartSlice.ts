import { createSlice } from "@reduxjs/toolkit";
import { Product } from "./types";
interface CartState {
  items: Product[];
}
const initialState: CartState = {
  items: [],
};
interface getName {
  name: string;
  product: Product;
}

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
    qty(state, action: { payload: getName }) {
      const checkifExist = state.items.findIndex((item) => {
        return item.id === action.payload.product.id;
      });
      if (checkifExist !== -1) {
        if (action.payload.name === "plus") {
          state.items[checkifExist].quantity =
            (action.payload.product.quantity || 0) + 1;
        } else if (action.payload.name === "minus") {
          if ((state.items[checkifExist].quantity || 1) > 1) {
            state.items[checkifExist].quantity =
              (action.payload.product.quantity || 0) - 1;
          }
        }
      }
    },
  },
});

export default cartSlice.reducer;
export const { add, remove, qty } = cartSlice.actions;
