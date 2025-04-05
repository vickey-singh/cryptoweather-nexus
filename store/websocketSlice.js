// store/websocketSlice.js
import { createSlice } from "@reduxjs/toolkit";

const websocketSlice = createSlice({
  name: "websocket",
  initialState: {
    prices: {},
  },
  reducers: {
    updatePrices: (state, action) => {
      if (action.payload && typeof action.payload === "object") {
        state.prices = {
          ...state.prices,
          ...action.payload,
        };
      }
    },
  },
});

export const { updatePrices } = websocketSlice.actions;
export default websocketSlice.reducer;
