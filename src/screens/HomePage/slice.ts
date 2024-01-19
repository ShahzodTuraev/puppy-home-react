import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../types/screen";

const initialState: HomePageState = {
  trendingProducts: [],
  bigSales: [],
  news: [],
};

const HomepageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setTrendingProducts: (state, action) => {
      state.trendingProducts = action.payload;
    },
    setBigSales: (state, action) => {
      state.bigSales = action.payload;
    },
    setNews: (state, action) => {
      state.news = action.payload;
    },
  },
});

export const { setTrendingProducts, setBigSales, setNews } =
  HomepageSlice.actions;

const homePageReducer = HomepageSlice.reducer;
export default homePageReducer;
