import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import Auth from "./auth/slice";
import FileSlice from "./file/slice";
import ImageSlice from "./image/slice";
import ModalSlice from "./modal/slice";
import Pagination from "./pagination/slice";
import Transaction from "./transaction/slice";
import Profile from "./profile/slice";
import MyCars from "./my-cars/slice";
import Products from "./products/slice";
import Balance from "./balance/slice";
import Friends from "./friends/slice";
import StationsSlice from "./stations/slice";
import DashboardSlice from "./dashboard/slice";
import MessagesSlice from "./messages/slice";

export const store = configureStore({
  reducer: {
    auth: Auth.reducer,
    profile: Profile.reducer,
    cars: MyCars.reducer,
    products: Products.reducer,
    transaction: Transaction.reducer,
    messages: MessagesSlice.reducer,
    stations: StationsSlice.reducer,
    balance: Balance.reducer,
    friends: Friends.reducer,
    dashboard: DashboardSlice.reducer,
    modal: ModalSlice.reducer,
    pagination: Pagination.reducer,
    file: FileSlice.reducer,
    image: ImageSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
  devTools: import.meta.env.REACT_APP_ENV !== "dev",
});
