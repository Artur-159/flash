import { createSlice } from "@reduxjs/toolkit";
import { BalanceAPI } from "../../services/balance";

const BalanceSlice = createSlice({
  name: "balance",
  initialState: {
    balances: null,
    addBalanceInfo: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(BalanceAPI.getBalances.fulfilled, (state, action) => {
        state.balances = action.payload;
      })
      .addCase(BalanceAPI.postAddBalance.fulfilled, (state, action) => {
        state.addBalanceInfo = action.payload;

        action.payload?.formUrl
          ? window.location.replace(action.payload.formUrl)
          : null;
      });
  },
});

export default BalanceSlice;
