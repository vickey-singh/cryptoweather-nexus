import { setWeather } from "./weatherSlice";
import { setCrypto } from "./cryptoSlice";
import { setNews } from "./newsSlice";

// 🌦️ Weather Data (Top Indian Cities)
export const fetchWeatherData = () => async (dispatch) => {
  try {
    const cities = ["Delhi", "Mumbai", "Bangalore"];
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

    const results = await Promise.all(
      cities.map(async (city) => {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await res.json();

        if (data.cod !== 200 || !data.main) {
          throw new Error(`Weather data missing for ${city}`);
        }

        return {
          name: data.name,
          temp: data.main.temp,
          humidity: data.main.humidity,
          description: data.weather[0].description,
        };
      })
    );

    dispatch(setWeather(results));
  } catch (error) {
    console.error("Weather fetch error:", error.message);
  }
};

// 💰 Crypto Data
export const fetchCryptoData = () => async (dispatch) => {
  try {
    const res = await fetch("https://api.coincap.io/v2/assets?limit=5");
    const data = await res.json();

    if (!Array.isArray(data.data)) {
      throw new Error("Invalid crypto data format");
    }

    dispatch(setCrypto(data.data));
  } catch (error) {
    console.error("Crypto fetch error:", error.message);
  }
};

// 📰 News Data (India-based Crypto News)
export const fetchNewsData = () => async (dispatch) => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    const res = await fetch(
      `https://newsdata.io/api/1/news?apikey=${apiKey}&q=crypto&country=in&language=en`
    );
    const data = await res.json();

    if (!Array.isArray(data.results)) {
      throw new Error("News data format incorrect");
    }

    dispatch(setNews(data.results.slice(0, 5)));
  } catch (error) {
    console.error("News fetch error:", error.message);
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

    if (data.cod === 200 && data.main) {
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
    console.error("Weather search error:", err.message);
    return { payload: null };
  }
};

// 🔍 Search Crypto by Name
export const searchCryptoByName = (name) => async () => {
  try {
    const res = await fetch("https://api.coincap.io/v2/assets");
    const data = await res.json();

    if (!Array.isArray(data.data)) {
      throw new Error("Crypto search data format incorrect");
    }

    const match = data.data.find((coin) =>
      coin.name.toLowerCase().includes(name.toLowerCase())
    );
    return { payload: match || null };
  } catch (err) {
    console.error("Crypto search error:", err.message);
    return { payload: null };
  }
};

// 🔍 Search News by Keyword
export const searchNewsByKeyword = (keyword) => async () => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    const res = await fetch(
      `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${keyword}&country=in&language=en`
    );
    const data = await res.json();

    if (!Array.isArray(data.results)) {
      throw new Error("News search data format incorrect");
    }

    return { payload: data.results };
  } catch (err) {
    console.error("News search error:", err.message);
    return { payload: [] };
  }
};
