import { createSlice } from "@reduxjs/toolkit";
import { TransactionAPI } from "../../services/transaction";
import TRANSACTION_STATUS from "../../constant/transaction-status";

const Transaction = createSlice({
  name: "Transaction slice",
  initialState: {
    transactions: [],
    types: [],
    statusInfo: [],
    filter: {},
    total: 0,
  },
  reducers: {
    setDelete: (state, action) => {
      state.delete = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(TransactionAPI.getAll.fulfilled, (state, action) => {
        state.total = action.payload.data.count;
        state.transactions = action.payload.data.data;
      })
      .addCase(TransactionAPI.getOne.fulfilled, (state, action) => {
        state.status = action.payload.statusText;
      })
      .addCase(TransactionAPI.getTypes.fulfilled, (state, action) => {
        state.types = action.payload.data;
      })
      .addCase(TransactionAPI.getStatusInfo.fulfilled, (state, action) => {
        state.statusInfo = action.payload.data.map((status) => ({
          ...status,
          icon: TRANSACTION_STATUS[status.id],
        }));
      });
  },
});

export const { setStatusText, setDeleteBranch, setFilter } =
  Transaction.actions;
export default Transaction;
