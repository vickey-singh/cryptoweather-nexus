import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptoData } from "@/store/actions";
import Link from "next/link";

export default function Crypto() {
  const dispatch = useDispatch();
  const crypto = useSelector((state) => state.crypto.data); // ✅ Correct state access

  useEffect(() => {
    dispatch(fetchCryptoData());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Top Cryptocurrencies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {crypto?.length > 0 ? (
          crypto.map((coin) => (
            <Link key={coin.id} href={`/crypto/${coin.id}`}>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{coin.name}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{coin.symbol.toUpperCase()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">${coin.current_price.toLocaleString()}</p>
                  <p
                    className={`text-sm ${
                      coin.price_change_percentage_24h >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center w-full col-span-3">Loading crypto data...</p>
        )}
      </div>
    </div>
  );
}
