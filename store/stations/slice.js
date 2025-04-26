import { createSlice } from "@reduxjs/toolkit";
import { StationsAPI } from "../../services/stations";

const StationsSlice = createSlice({
  name: "StationsSlice",
  initialState: {
    stations: [],
    optionsStations: [],
  },

  extraReducers: (builder) => {
    builder.addCase(StationsAPI.getAll.fulfilled, (state, action) => {
      const stationList = action.payload?.data;
      state.stations = stationList;
      state.optionsStations = stationList?.map((station) => ({
        value: station.id,
        label: station.address,
      }));
    });
  },
});

export default StationsSlice;
