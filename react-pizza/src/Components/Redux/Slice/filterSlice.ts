import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type } from "@testing-library/user-event/dist/type";
import { RootState } from "../store";

export type sortSliceType = {
  name: String;
  sortProperty: 'rating' | 'title' | 'price' | '-rating' | '-title' | '-price'
}

export interface filterSliceState {
  searchValue: String,
  categoriesId: number,
  currentPage: number,
  sort: sortSliceType
}

const initialState: filterSliceState = {
  searchValue: " ",
  categoriesId: 0,
  currentPage: 1,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoriesId(state, action: PayloadAction<number>) {
      state.categoriesId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<String>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<sortSliceType>) {
      state.sort = action.payload;
    }, 
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<filterSliceState>) {
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoriesId = Number(action.payload.categoriesId);
    },
  },
});

export const selectSort = (state: RootState) => state.filter.sort;
export const selectFillter = (state: RootState) => state.filter;
export const {
  setCategoriesId,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
