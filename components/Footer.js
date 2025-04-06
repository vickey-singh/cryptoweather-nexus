const Footer = () => {
    return (
      <footer className="bg-[#0a0a23] text-white py-6 px-4 mt-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm md:text-base">
            © {new Date().getFullYear()} <span className="text-blue-500 font-semibold">CryptoWeather Nexus</span>. All rights reserved.
          </p>
          <p className="mt-2 text-xs md:text-sm text-gray-400">
            Built with 💙 by <span className="text-white font-bold">Vickey Singh</span>
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  