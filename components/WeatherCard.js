import React, { useEffect, useState } from "react";
import { getWeather } from "../utils/api";

const WeatherCard = ({ city }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getWeather(city);
      setWeather(data);
    };
    fetchWeather();
  }, [city]);

  if (!weather) return <p className="text-gray-400">Loading {city}...</p>;

  return (
    <div className="bg-blue-500 p-4 rounded-lg shadow-lg text-white">
      <h2 className="text-lg font-bold">{weather.name}</h2>
      <p>🌡️ {weather.main.temp}°C</p>
      <p>💧 Humidity: {weather.main.humidity}%</p>
      <p>🌥️ {weather.weather[0].description}</p>
    </div>
  );
};

export default WeatherCard;
