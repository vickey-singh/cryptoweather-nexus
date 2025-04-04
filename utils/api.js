import axios from "axios";

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Function to fetch weather data for a city
export const getWeather = async (city) => {
  try {
    const response = await axios.get(`${WEATHER_BASE_URL}`, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: "metric", // Temperature in Celsius
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
