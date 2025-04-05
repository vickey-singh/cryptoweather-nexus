import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: [],
    details: {},
    loading: false,
    error: null,
  },
  reducers: {
    setWeather: (state, action) => {
      state.data = action.payload;
    },
    setWeatherDetails: (state, action) => {
      const city = action.payload.name.toLowerCase();
      state.details[city] = action.payload;
    },
    setWeatherLoading: (state, action) => {
      state.loading = action.payload;
    },
    setWeatherError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setWeather,
  setWeatherDetails,
  setWeatherLoading,
  setWeatherError,
} = weatherSlice.actions;

export default weatherSlice.reducer;
