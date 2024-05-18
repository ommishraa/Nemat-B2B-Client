import { combineReducers } from "@reduxjs/toolkit";
import profileSlice from "../../slices/profileSlice";
import categorySlice from "../../slices/categorySlice";
import cartSlice from "../../slices/cartSlice";

const rootReducer = combineReducers({
  profile: profileSlice,
  category: categorySlice,
  cartSlice: cartSlice,
});

export default rootReducer;
