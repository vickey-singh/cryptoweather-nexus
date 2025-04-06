// pages/crypto/[id].js

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function CryptoDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchCryptoDetail = async () => {
      try {
        const res = await fetch(`https://api.coincap.io/v2/assets/${id}`);
        const data = await res.json();
        setCoin(data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching crypto details:", err);
        setLoading(false);
      }
    };

    fetchCryptoDetail();
  }, [id]);

  if (loading)
    return (
      <div className="text-center p-6 text-xl text-gray-500 dark:text-gray-300">
        Loading crypto details...
      </div>
    );

  if (!coin)
    return (
      <div className="text-center p-6 text-xl text-red-500">
        No data found for this coin.
      </div>
    );

  const isUp = parseFloat(coin.changePercent24Hr) >= 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/" className="text-blue-500 hover:underline mb-6 block">
        ← Back
      </Link>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold">
          {coin.name} <span className="text-gray-500">({coin.symbol})</span>
        </h1>

        <div className="flex items-center gap-3 text-2xl font-semibold">
          <span>${parseFloat(coin.priceUsd).toFixed(2)}</span>
          <span
            className={`flex items-center gap-1 text-sm ${
              isUp ? "text-green-600" : "text-red-600"
            }`}
          >
            {isUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            {parseFloat(coin.changePercent24Hr).toFixed(2)}%
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <p>
            <strong>Rank:</strong> {coin.rank}
          </p>
          <p>
            <strong>Market Cap:</strong> $
            {parseFloat(coin.marketCapUsd).toLocaleString()}
          </p>
          <p>
            <strong>Supply:</strong> {parseFloat(coin.supply).toLocaleString()}
          </p>
          <p>
            <strong>Volume (24h):</strong> $
            {parseFloat(coin.volumeUsd24Hr).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
