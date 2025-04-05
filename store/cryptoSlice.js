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
    updatePrices: (state, action) => {
      const priceUpdates = action.payload;
      state.data = state.data.map((coin) => {
        if (priceUpdates[coin.id]) {
          return {
            ...coin,
            priceUsd: priceUpdates[coin.id],
          };
        }
        return coin;
      });
    },
  },
});

export const { setCrypto, updatePrices } = cryptoSlice.actions;
export default cryptoSlice.reducer;
