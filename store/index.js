import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherSlice";
import cryptoReducer from "./cryptoSlice";
import newsReducer from "./newsSlice";
import favoritesReducer from "./favoritesSlice";
import websocketReducer from "./websocketSlice";

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    crypto: cryptoReducer,
    news: newsReducer,
    favorites: favoritesReducer,
    websocket: websocketReducer,
  },
});

export default store;
