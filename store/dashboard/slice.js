import { createSlice } from "@reduxjs/toolkit";
import { DashboardAPI } from "../../services/dashboard";
import TRANSACTION_STATUS from "../../constant/transaction-status";

const DashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    balances: null,
    vehicles: null,
    connections: null,
    friends: null,
    partners: null,
    transactions: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(DashboardAPI.getAll.fulfilled, (state, action) => {
      const {
        balances,
        vehicles,
        connections,
        friends,
        partners,
        transactions,
      } = action.payload;

      state.balances = balances;
      state.vehicles = vehicles;
      state.connections = connections;
      state.friends = friends;
      state.partners = partners;
      state.transactions = transactions.map((item) => {
        return {
          ...item,
          icon: TRANSACTION_STATUS[item.transaction_status_id],
        };
      });
    });
  },
});

export default DashboardSlice;
