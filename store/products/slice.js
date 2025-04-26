import { createSlice } from "@reduxjs/toolkit";
import { ProductsAPI } from "../../services/products";

const Products = createSlice({
  name: "Products slice",
  initialState: {
    products: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(ProductsAPI.getAll.fulfilled, (state, action) => {
      state.products = action.payload;
      localStorage.setItem("products", JSON.stringify(action.payload));
    });
  },
});

export const { setProducts } = Products.actions;
export default Products;
