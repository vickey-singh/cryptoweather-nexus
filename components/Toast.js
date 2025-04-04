import React from "react";

export default function Toast({ type, message }) {
  const bgColor =
    type === "price_alert"
      ? "bg-green-600"
      : type === "weather_alert"
      ? "bg-blue-600"
      : "bg-gray-800";

  return (
    <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg text-white shadow-xl animate-bounce ${bgColor}`}>
      <p className="text-sm font-semibold">{message}</p>
    </div>
  );
}
