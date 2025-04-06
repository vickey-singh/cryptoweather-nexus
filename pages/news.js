// pages/news.js

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsData } from "@/store/actions";

export default function News() {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.articles);

  useEffect(() => {
    dispatch(fetchNewsData());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Latest Crypto News</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news?.length > 0 ? (
          news.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow hover:shadow-lg transition duration-300"
            >
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {item.description?.slice(0, 100)}...
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(item.pubDate).toLocaleDateString()} • {item.source_id}
                </p>
              </div>
            </a>
          ))
        ) : (
          <p className="text-center col-span-3">Loading news...</p>
        )}
      </div>
    </div>
  );
}
