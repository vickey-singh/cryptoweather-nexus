import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const CityWeatherDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState(null);

  useEffect(() => {
    if (!router.isReady || !id) return;

    async function fetchCityData() {
      try {
        console.log("Fetching weather for:", id);

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            id
          )}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
        );

        const cityData = await res.json();
        console.log("API Response:", cityData);

        if (cityData.cod === 200) {
          setData(cityData);
        } else {
          console.error("City not found:", cityData.message);
        }
      } catch (err) {
        console.error("City fetch error:", err);
      }
    }

    fetchCityData();
  }, [router.isReady, id]);

  if (!data) {
    return <div className="text-center text-white p-4">Loading weather details...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">{data.name}</h1>
        <p className="text-lg">🌡️ Temperature: {data.main.temp}°C</p>
        <p className="text-lg">💧 Humidity: {data.main.humidity}%</p>
        <p className="text-lg">🌥️ Condition: {data.weather[0].description}</p>
        <p className="text-lg">🌬️ Wind Speed: {data.wind.speed} m/s</p>
      </div>
    </div>
  );
};

export default CityWeatherDetails;
