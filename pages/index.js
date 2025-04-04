import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWeatherData,
  fetchCryptoData,
  fetchNewsData,
  searchWeatherByCity,
  searchCryptoByName,
  searchNewsByKeyword,
} from "@/store/actions";
import { updatePrices } from "@/store/websocketSlice";
import Link from "next/link";


export default function Home() {
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather.data);
  const crypto = useSelector((state) => state.crypto.data);
  const news = useSelector((state) => state.news.articles);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("weather");
  const [searchResults, setSearchResults] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    dispatch(fetchWeatherData());
    dispatch(fetchCryptoData());
    dispatch(fetchNewsData());
  }, []);

  useEffect(() => {
    const ws = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin,ethereum,solana");
    ws.onmessage = (msg) => {
      const priceUpdate = JSON.parse(msg.data);
      dispatch(updatePrices(priceUpdate));
    };
    return () => ws.close();
  }, []);

  const handleSearch = async () => {
    setNotFound(false);
    setSearchResults([]);

    if (!searchQuery.trim()) return;

    if (searchType === "weather") {
      const result = await dispatch(searchWeatherByCity(searchQuery));
      if (result?.payload?.name) {
        setSearchResults([result.payload]);
      } else {
        setNotFound(true);
      }
    } else if (searchType === "crypto") {
      const result = await dispatch(searchCryptoByName(searchQuery));
      if (result?.payload?.id) {
        setSearchResults([result.payload]);
      } else {
        setNotFound(true);
      }
    } else if (searchType === "news") {
      const result = await dispatch(searchNewsByKeyword(searchQuery));
      if (result?.payload?.length > 0) {
        setSearchResults(result.payload);
      } else {
        setNotFound(true);
      }
    }
  };

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-4xl font-bold mb-6">CryptoWeather Nexus</h1>

      {/* Search Bar */}
      <div className="mb-10 flex flex-col sm:flex-row gap-3 items-center">
        <input
          type="text"
          placeholder="Enter city / crypto / topic..."
          className="p-3 rounded-xl text-black flex-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="p-3 rounded-xl text-black bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="weather">Weather</option>
          <option value="crypto">Crypto</option>
          <option value="news">News</option>
        </select>
        <button
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:opacity-90 transition"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Not Found Message */}
      {notFound && (
        <p className="text-red-400 font-semibold mb-6">
          No results found for "{searchQuery}" in {searchType}.
        </p>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {searchType === "weather" &&
              searchResults.map((city) => (
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

            {searchType === "crypto" &&
              searchResults.map((coin) => (
                <div key={coin.id} className="bg-gray-800 p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold">{coin.name}</h3>
                  <p>Price: ${parseFloat(coin.priceUsd).toFixed(2)}</p>
                  <Link href={`/crypto/${coin.id}`}>
                    <button className="bg-blue-600 px-3 py-1 mt-2 rounded">View Details</button>
                  </Link>
                </div>
              ))}

            {searchType === "news" &&
              searchResults.map((article, index) => (
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
      )}

      {/* Original Weather Section */}
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
