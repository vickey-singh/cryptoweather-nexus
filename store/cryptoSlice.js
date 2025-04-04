import { createSlice } from "@reduxjs/toolkit";

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    data: [],
  },
  reducers: {
    setCrypto: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setCrypto } = cryptoSlice.actions;
export default cryptoSlice.reducer;
