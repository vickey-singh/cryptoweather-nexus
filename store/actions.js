import { setWeather } from "./weatherSlice";
import { setCrypto } from "./cryptoSlice";
import { setNews } from "./newsSlice";

// 🌦️ Weather Data (Top cities)
export const fetchWeatherData = () => async (dispatch) => {
  try {
    const cities = ["New York", "London", "Tokyo"];
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const results = await Promise.all(
      cities.map(async (city) => {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await res.json();
        return {
          name: city,
          temp: data.main.temp,
          humidity: data.main.humidity,
          description: data.weather[0].description,
        };
      })
    );
    dispatch(setWeather(results));
  } catch (error) {
    console.error("Weather fetch error:", error);
  }
};

// 💰 Crypto Data
export const fetchCryptoData = () => async (dispatch) => {
  try {
    const res = await fetch("https://api.coincap.io/v2/assets?limit=3");
    const data = await res.json();
    dispatch(setCrypto(data.data));
  } catch (error) {
    console.error("Crypto fetch error:", error);
  }
};

// 📰 News Data
export const fetchNewsData = () => async (dispatch) => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    const res = await fetch(
      `https://newsdata.io/api/1/news?apikey=${apiKey}&q=crypto&language=en`
    );
    const data = await res.json();
    dispatch(setNews(data.results.slice(0, 5)));
  } catch (error) {
    console.error("News fetch error:", error);
  }
};

// 🔍 Search Weather by City
export const searchWeatherByCity = (city) => async () => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    const data = await res.json();

    if (data.cod === 200) {
      return {
        payload: {
          name: data.name,
          temp: data.main.temp,
          humidity: data.main.humidity,
          description: data.weather[0].description,
        },
      };
    } else {
      return { payload: null };
    }
  } catch (err) {
    return { payload: null };
  }
};

// 🔍 Search Crypto by Name
export const searchCryptoByName = (name) => async () => {
  try {
    const res = await fetch("https://api.coincap.io/v2/assets");
    const data = await res.json();
    const match = data.data.find((coin) =>
      coin.name.toLowerCase().includes(name.toLowerCase())
    );
    return { payload: match || null };
  } catch (err) {
    return { payload: null };
  }
};

// 🔍 Search News by Keyword
export const searchNewsByKeyword = (keyword) => async () => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    const res = await fetch(
      `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${keyword}&language=en`
    );
    const data = await res.json();
    return { payload: data.results || [] };
  } catch (err) {
    return { payload: [] };
  }
};
