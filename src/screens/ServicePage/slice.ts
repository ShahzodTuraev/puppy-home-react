import { createSlice } from "@reduxjs/toolkit";
import { ServicePageState } from "../../types/screen";

const initialState: ServicePageState = {
  allServices: [],
  relatedServices: [],
  chosenService: null,
  serviceReviews: [],
};

const ServicePageSlice = createSlice({
  name: "servicePage",
  initialState,
  reducers: {
    setAllServices: (state, action) => {
      state.allServices = action.payload;
    },
    setRelatedServices: (state, action) => {
      state.relatedServices = action.payload;
    },
    setServiceReviews: (state, action) => {
      state.serviceReviews = action.payload;
    },
    setChosenService: (state, action) => {
      state.chosenService = action.payload;
    },
  },
});

export const {
  setAllServices,
  setRelatedServices,
  setServiceReviews,
  setChosenService,
} = ServicePageSlice.actions;

const servicePageReducer = ServicePageSlice.reducer;
export default servicePageReducer;
