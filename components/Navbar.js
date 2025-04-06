'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <nav className="bg-[#0a0a23] text-white px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold">
        <span className="text-blue-500">Crypto</span>Weather <span className="text-blue-500">Nexus</span>
      </Link>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex gap-6 text-lg items-center">
        <Link href="/" className="hover:text-blue-400">Home</Link>
        <Link href="/weather" className="hover:text-blue-400">Weather</Link>
        <Link href="/crypto" className="hover:text-blue-400">Crypto</Link>
        <Link href="/news" className="hover:text-blue-400">News</Link>
        <Link href="/settings" className="hover:text-blue-400">Settings</Link>
        <button onClick={() => setIsDark(!isDark)}>
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Button */}
      {!isMenuOpen && (
        <button
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden focus:outline-none"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[75%] max-w-sm bg-[#0d0d0d] text-white transform transition-transform duration-300 rounded-l-xl shadow-lg ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Top Bar */}
        <div className="p-5 flex items-center justify-between border-b border-gray-700">
          <span className="font-bold text-xl leading-tight">
            <span className="text-blue-500">Crypto</span>Weather<br />
            <span className="text-blue-500">Nexus</span>
          </span>
          <button onClick={() => setIsMenuOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col gap-6 px-6 py-8 text-lg">
          <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/weather" onClick={() => setIsMenuOpen(false)}>Weather</Link>
          <Link href="/crypto" onClick={() => setIsMenuOpen(false)}>Crypto</Link>
          <Link href="/news" onClick={() => setIsMenuOpen(false)}>News</Link>
          <Link href="/settings" onClick={() => setIsMenuOpen(false)}>Settings</Link>
          <button onClick={() => setIsDark(!isDark)}>
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
