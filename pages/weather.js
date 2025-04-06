// pages/weather.js
import { useEffect, useState } from "react";
import Link from "next/link";

const TOP_CITIES = ["Delhi", "Mumbai", "Bangalore", "Kolkata", "Chennai", "Hyderabad"];

export default function Weather() {
  const [topCities, setTopCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTopCityWeather = async () => {
      try {
        const results = await Promise.all(
          TOP_CITIES.map(async (city) => {
            const res = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
            );
            const data = await res.json();

            if (data.cod !== 200 || !data.main) {
              throw new Error(`Weather data missing for ${city}`);
            }

            return {
              name: city,
              temp: data.main.temp,
              humidity: data.main.humidity,
              description: data.weather[0].description,
              icon: data.weather[0].icon, // ⬅️ ICON ADD HERE
            };
          })
        );

        setTopCities(results);
      } catch (err) {
        console.error("Error loading top cities:", err);
        setError("Unable to load weather data at this time.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopCityWeather();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading weather data...</div>;
  if (error) return <div className="p-4 text-red-500 text-center">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">🌤 Weather (Top Cities)</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topCities.map((city) => (
          <Link key={city.name} href={`/weather/${encodeURIComponent(city.name)}`}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow hover:shadow-xl transition cursor-pointer text-center">
              <img
                src={`https://openweathermap.org/img/wn/${city.icon}@2x.png`}
                alt={city.description}
                className="w-20 h-20 mx-auto"
              />
              <h2 className="text-xl font-bold mt-2">{city.name}</h2>
              <p className="capitalize text-gray-600 dark:text-gray-300">{city.description}</p>
              <p className="text-3xl font-bold mt-2">{city.temp}°C</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Humidity: {city.humidity}%</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
