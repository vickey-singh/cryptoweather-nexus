import { createSlice } from "@reduxjs/toolkit";

const wsSlice = createSlice({
  name: "websocket",
  initialState: {
    data: {},
  },
  reducers: {
    updatePrices: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
  },
});

export const { updatePrices } = wsSlice.actions;
export default wsSlice.reducer;
