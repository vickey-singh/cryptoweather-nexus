// store/favoritesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    cities: [],
    cryptos: [],
  },
  reducers: {
    toggleFavoriteCity: (state, action) => {
      const city = action.payload;
      if (state.cities.includes(city)) {
        state.cities = state.cities.filter((c) => c !== city);
      } else {
        state.cities.push(city);
      }
    },
    toggleFavoriteCrypto: (state, action) => {
      const crypto = action.payload;
      if (state.cryptos.includes(crypto)) {
        state.cryptos = state.cryptos.filter((c) => c !== crypto);
      } else {
        state.cryptos.push(crypto);
      }
    },
  },
});

export const { toggleFavoriteCity, toggleFavoriteCrypto } = favoritesSlice.actions;
export default favoritesSlice.reducer;
