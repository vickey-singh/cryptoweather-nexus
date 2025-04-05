import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWeatherData,
  fetchCryptoData,
  fetchNewsData,
  searchWeatherByCity,
  searchCryptoByName,
  searchNewsByKeyword,
} from "@/store/actions";
import Link from "next/link";

export default function Home() {
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather.data);
  const crypto = useSelector((state) => state.crypto.data);
  const news = useSelector((state) => state.news.articles);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchType, setSearchType] = useState("weather");

  useEffect(() => {
    dispatch(fetchWeatherData());
    dispatch(fetchCryptoData());
    dispatch(fetchNewsData());
  }, [dispatch]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoadingSearch(true);
    let result = null;

    if (searchType === "weather") {
      result = await dispatch(searchWeatherByCity(searchQuery));
    } else if (searchType === "crypto") {
      result = await dispatch(searchCryptoByName(searchQuery));
    } else if (searchType === "news") {
      result = await dispatch(searchNewsByKeyword(searchQuery));
    }

    if (result?.payload) {
      if (Array.isArray(result.payload)) {
        setSearchResults(result.payload);
      } else {
        setSearchResults([result.payload]);
      }
    } else {
      setSearchResults([]);
    }

    setLoadingSearch(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">
        CryptoWeather Nexus 🌦️💰📰
      </h1>

      {/* 🔍 Search Section */}
      <div className="max-w-xl mx-auto mb-8">
        <input
          type="text"
          className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400"
          placeholder='Type something to search like "London", "Bitcoin", or "Ethereum"'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex justify-between items-center mt-2">
          <select
            className="bg-gray-700 p-2 rounded"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="weather">Weather</option>
            <option value="crypto">Crypto</option>
            <option value="news">News</option>
          </select>
          <button
            onClick={handleSearch}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </div>

      {/* 🔍 Search Results */}
      {loadingSearch ? (
        <p className="text-center mb-4">Loading...</p>
      ) : searchResults.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {searchResults.map((item, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded shadow">
              {searchType === "weather" && (
                <>
                  <Link href={`/weather/${item.name}`}>
                    <h2 className="text-2xl font-bold cursor-pointer hover:text-blue-400">
                      {item.name}
                    </h2>
                  </Link>
                  <p className="capitalize">{item.description}</p>
                  <p>Temp: {item.temp}°C</p>
                  <p>Humidity: {item.humidity}%</p>
                </>
              )}
              {searchType === "crypto" && (
                <>
                  <Link href={`/crypto/${item.id}`}>
                    <h2 className="text-2xl font-bold cursor-pointer hover:text-yellow-400">
                      {item.name}
                    </h2>
                  </Link>
                  <p>Price: ${parseFloat(item.priceUsd).toFixed(2)}</p>
                  <p>Symbol: {item.symbol}</p>
                </>
              )}
              {searchType === "news" && (
                <>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-400"
                  >
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                  </a>
                  <p>{item.description}</p>
                </>
              )}
            </div>
          ))}
        </div>
      ) : searchQuery !== "" ? (
        <p className="text-center text-red-400 mb-4">
          No results found. Please try a different query.
        </p>
      ) : null}

      {/* 🌦️ Weather Section */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-4">Weather (Top Cities)</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {weather.map((city, index) => (
            <div
              key={index}
              className="bg-gray-800 text-white rounded-lg p-4 shadow hover:shadow-lg transition duration-200"
            >
              <Link href={`/weather/${encodeURIComponent(city.name)}`}>
                <h3 className="text-xl font-semibold cursor-pointer hover:text-blue-400">
                  {city.name}
                </h3>
              </Link>
              <p className="capitalize">{city.description}</p>
              <p>🌡️ Temp: {city.temp}°C</p>
              <p>💧 Humidity: {city.humidity}%</p>
            </div>
          ))}
        </div>
      </section>

      {/* 💰 Crypto Section */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-4">Cryptocurrency</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {crypto.map((coin, index) => (
            <Link key={index} href={`/crypto/${coin.id}`}>
              <div className="bg-gray-800 p-4 rounded shadow hover:bg-gray-700 transition cursor-pointer">
                <h3 className="text-xl font-semibold">{coin.name}</h3>
                <p>Price: ${parseFloat(coin.priceUsd).toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 📰 News Section */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Crypto News</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {news.map((article, index) => (
            <a
              key={index}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gray-800 p-4 rounded hover:bg-gray-700 transition"
            >
              <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
              <p className="text-gray-400">{article.description}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
