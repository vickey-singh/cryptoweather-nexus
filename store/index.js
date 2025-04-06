// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherSlice";
import cryptoReducer from "./cryptoSlice";
import newsReducer from "./newsSlice";
import favoritesReducer from "./favoritesSlice";
import websocketReducer from "./websocketSlice";
import settingsReducer from "./settingsSlice"; // 👈 Import settings reducer

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    crypto: cryptoReducer,
    news: newsReducer,
    favorites: favoritesReducer,
    websocket: websocketReducer,
    settings: settingsReducer, // 👈 Add to store
  },
  devTools: process.env.NODE_ENV !== "production", // 🔍 Enable Redux DevTools only in dev
});

export default store;
