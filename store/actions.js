import { setWeather } from "./weatherSlice";
import { setCrypto } from "./cryptoSlice";
import { setNews } from "./newsSlice";

// Weather Data
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

// Crypto Data
export const fetchCryptoData = () => async (dispatch) => {
  try {
    const res = await fetch("https://api.coincap.io/v2/assets?limit=3");
    const data = await res.json();
    dispatch(setCrypto(data.data));
  } catch (error) {
    console.error("Crypto fetch error:", error);
  }
};

// News Data
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
