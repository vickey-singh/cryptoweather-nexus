import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWeatherData,
  fetchCryptoData,
  fetchNewsData,
} from "@/store/actions";
import { updatePrices } from "@/store/websocketSlice";
import Link from "next/link";

export default function Home() {
  const dispatch = useDispatch();

  const weather = useSelector((state) => state.weather.data);
  const crypto = useSelector((state) => state.crypto.data);
  const news = useSelector((state) => state.news.articles);

  // Fetch data on load
  useEffect(() => {
    dispatch(fetchWeatherData());
    dispatch(fetchCryptoData());
    dispatch(fetchNewsData());
  }, []);

  // WebSocket for real-time crypto prices
  useEffect(() => {
    const ws = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin,ethereum,solana");

    ws.onmessage = (msg) => {
      const priceUpdate = JSON.parse(msg.data);
      dispatch(updatePrices(priceUpdate));
    };

    return () => ws.close();
  }, []);

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-4xl font-bold mb-6">CryptoWeather Nexus</h1>

      {/* Weather Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Weather (Top Cities)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.isArray(weather) &&
            weather.map((city) => (
              <div key={city.name} className="bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">{city.name}</h3>
                <p>Temperature: {city.temp}°C</p>
                <p>Humidity: {city.humidity}%</p>
                <p>Condition: {city.description}</p>
                <Link href={`/weather/${city.name}`}>
                  <button className="bg-blue-600 px-3 py-1 mt-2 rounded">View Details</button>
                </Link>
              </div>
            ))}
        </div>
      </section>

      {/* Crypto Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Cryptocurrency</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.isArray(crypto) &&
            crypto.map((coin) => (
              <div key={coin.id} className="bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">{coin.name}</h3>
                <p>Price: ${parseFloat(coin.priceUsd).toFixed(2)}</p>
                <Link href={`/crypto/${coin.id}`}>
                  <button className="bg-blue-600 px-3 py-1 mt-2 rounded">View Details</button>
                </Link>
              </div>
            ))}
        </div>
      </section>

      {/* News Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Crypto News</h2>
        <div className="space-y-4">
          {Array.isArray(news) &&
            news.map((article, index) => (
              <a
                key={index}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gray-800 rounded hover:bg-gray-700 transition"
              >
                <h3 className="text-lg font-semibold">{article.title}</h3>
                <p className="text-sm text-gray-400">{article.pubDate}</p>
              </a>
            ))}
        </div>
      </section>
    </div>
  );
}
