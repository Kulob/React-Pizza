import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";
import { RootState } from "../store";

// type FetchPizzasArgs = Record<string, string>;
export type FetchPizzasArgs = {
  sortBy: string;
  order: string;
  search: String;
  catigories: string;
  currentPage: number;
}

export enum Status {
  LOADING ='loading',
  SUCCESS ='success',
  ERROR ='error'
}

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
  "pizza/fetchPizzasStatus", async (params) => {
    const { sortBy, order, search, catigories, currentPage } = params;
    const { data } = await axios.get(
      `https://633c9178f2b0e623dc6496be.mockapi.io/items?page=${currentPage}&limit=4&${catigories}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);
type Pizza = {
  id: String, 
  title: String, 
  price:number, 
  sizes:number[], 
  imageUrl: any, 
  count: number, 
  types: number[];
  rating: number;
}

interface PizzaSliceState {
  items: Pizza[];
  status: 'loading' | 'success' | 'error';
}

export const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    })
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    })
  },

});

export const selectPizzaData = (state: RootState) => state.pizza;
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
