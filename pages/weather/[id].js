import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const WeatherDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchWeatherDetail = async () => {
      try {
        setLoading(true);
        const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${decodeURIComponent(
            id
          )}&appid=${apiKey}&units=metric`
        );
        const data = await res.json();

        if (data.cod !== 200 || !data.main) {
          throw new Error(`Could not load weather info for ${id}`);
        }

        setWeatherInfo({
          name: data.name,
          temp: data.main.temp,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          wind: data.wind.speed,
        });
      } catch (err) {
        console.error("Error fetching weather details:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherDetail();
  }, [id]);

  if (loading)
    return (
      <div className="p-4 text-center text-lg font-semibold text-gray-300">
        Loading weather info...
      </div>
    );

  if (error)
    return (
      <div className="p-4 text-center text-red-400 font-semibold">
        ❌ {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-100 rounded-2xl shadow-xl p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          {weatherInfo.name}
        </h2>
        <p className="text-center text-gray-700 mb-6 capitalize text-lg">
          {weatherInfo.description}
        </p>
        <div className="space-y-4 text-center text-gray-800">
          <p>🌡️ <strong>Temperature:</strong> {weatherInfo.temp}°C</p>
          <p>💧 <strong>Humidity:</strong> {weatherInfo.humidity}%</p>
          <p>🌬️ <strong>Wind Speed:</strong> {weatherInfo.wind} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetail;
