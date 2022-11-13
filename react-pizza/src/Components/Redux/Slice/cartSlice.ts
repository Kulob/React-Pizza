import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type } from "@testing-library/user-event/dist/type";
import { calcTotalPrice } from "../../../utils/calcTotalPrice";
import { getCartFromLS } from "../../../utils/getCartFromLS";
import { RootState } from "../store";

export type CartItems = {
  id: String, 
  title: String, 
  price: number, 
  size: number, 
  imageUrl: String, 
  count: number, 
  type: String;
}


interface CartSliceState {
  totalPrice: number;
  items: CartItems[];
}


const initialState: CartSliceState = getCartFromLS();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addItem(state, action) {
    //   state.items.push(action.payload);
    //   state.totalPrice = state.items.reduce((sum, obj) => {
    //     return obj.price + sum;
    //   }, 0);
    addItem(state, action: PayloadAction<CartItems>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.items)
    },
    addItemMinus(state, action: PayloadAction<String>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
    removeItem(state, action: PayloadAction<String>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectItems = (state: RootState) => state.cart.items;
export const selectHeader = (state: RootState) => state.cart;

export const selectCartItemsById = (id: String) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, addItemMinus, clearItems } =
  cartSlice.actions;

export default cartSlice.reducer;
