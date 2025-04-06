// pages/settings.js
import ThemeToggle from "@/components/ThemeToggle";

export default function Settings() {
  return (
    <div className="min-h-screen p-4 text-white">
      <h1 className="text-3xl font-bold mb-6">⚙️ Settings</h1>

      {/* Theme Toggle */}
      <div className="bg-gray-800 p-4 rounded mb-4">
        <h2 className="text-xl font-semibold mb-2">Theme</h2>
        <ThemeToggle />
      </div>
    </div>
  );
}
