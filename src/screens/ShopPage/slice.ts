import { createSlice } from "@reduxjs/toolkit";
import { ShopPageState } from "../../types/screen";

const initialState: ShopPageState = {
  allProducts: [],
};

const ShopPageSlice = createSlice({
  name: "shopPage",
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
  },
});

export const { setAllProducts } = ShopPageSlice.actions;

const shopPageReducer = ShopPageSlice.reducer;
export default shopPageReducer;
