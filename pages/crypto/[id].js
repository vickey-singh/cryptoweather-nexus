// pages/crypto/[id].js

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

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

  if (loading) return <p className="text-white p-4">Loading crypto details...</p>;

  if (!coin) return <p className="text-white p-4">No data found.</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <Link href="/" className="text-blue-400 underline mb-4 block">← Back</Link>
      <h1 className="text-3xl font-bold mb-4">{coin.name} ({coin.symbol})</h1>
      <p><strong>Rank:</strong> {coin.rank}</p>
      <p><strong>Price USD:</strong> ${parseFloat(coin.priceUsd).toFixed(2)}</p>
      <p><strong>Market Cap:</strong> ${parseFloat(coin.marketCapUsd).toFixed(2)}</p>
      <p><strong>Volume (24h):</strong> ${parseFloat(coin.volumeUsd24Hr).toFixed(2)}</p>
      <p><strong>Change (24h):</strong> {parseFloat(coin.changePercent24Hr).toFixed(2)}%</p>
    </div>
  );
}
