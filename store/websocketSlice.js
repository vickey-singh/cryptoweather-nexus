// store/websocketSlice.js
import { createSlice } from "@reduxjs/toolkit";

const websocketSlice = createSlice({
  name: "websocket",
  initialState: {
    prices: {},
  },
  reducers: {
    updatePrices: (state, action) => {
      state.prices = {
        ...state.prices,
        ...action.payload,
      };
    },
  },
});

export const { updatePrices } = websocketSlice.actions;
export default websocketSlice.reducer;
