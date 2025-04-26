import { createSlice } from "@reduxjs/toolkit";
import { MyCarsAPI } from "../../services/my-cars";

const MyCars = createSlice({
  name: "MyCars slice",
  initialState: {
    cars: [],
    oneCar: [],
    total: null,
  },
  reducers: {
    clearOneCar: (state) => {
      state.oneCar = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(MyCarsAPI.getAll.fulfilled, (state, action) => {
        const { data, count } = action.payload;
        state.cars = data;
        state.total = count;
      })
      .addCase(MyCarsAPI.getOne.fulfilled, (state, action) => {
        state.oneCar = action.payload;
      });
  },
});
export const { clearOneCar } = MyCars.actions;
export default MyCars;
