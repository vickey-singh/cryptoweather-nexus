import { useRouter } from "next/router";

const WeatherCard = ({ city }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/weather/${city.name.toLowerCase()}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-blue-100 p-4 rounded-lg shadow-md cursor-pointer hover:bg-blue-200 transition"
    >
      <h2 className="text-xl font-bold">{city.name}</h2>
      <p>{city.description}</p>
      <p>🌡 Temperature: {city.temp}°C</p>
      <p>💧 Humidity: {city.humidity}%</p>
    </div>
  );
};

export default WeatherCard;
