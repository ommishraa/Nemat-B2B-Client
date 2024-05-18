import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalCartValue: 0,
};

// console.log("totalCartValue", initialState);

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initialState,
  reducers: {
    totalCartValueInCart(state, value) {
      state.totalCartValue = value.payload;
      // console.log("redux", value.payload);
    },
  },
});

export const { totalCartValueInCart } = cartSlice.actions;
export default cartSlice.reducer;
