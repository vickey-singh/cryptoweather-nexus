import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("weather");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(category, query);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 items-center bg-gray-900 p-4 rounded-lg shadow-md"
    >
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 rounded bg-gray-700 text-white border border-gray-500"
      >
        <option value="weather">Weather</option>
        <option value="crypto">Crypto</option>
        <option value="news">News</option>
      </select>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name or keyword"
        className="p-2 rounded bg-white text-black w-full sm:w-64 border border-gray-400"
      />

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
      >
        Search
      </button>
    </form>
  );
}
