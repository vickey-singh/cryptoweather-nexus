// pages/_app.js
import "@/styles/globals.css";
import { Provider, useSelector } from "react-redux";
import store from "@/store";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";

// Inner App with Theme logic
function ThemedApp({ Component, pageProps }) {
  const theme = useSelector((state) => state.settings.theme);

  useEffect(() => {
    // Apply theme class to root <html> element
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0f172a] text-black dark:text-white transition-all duration-300">
      <Navbar />
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

// App Wrapper with Redux Provider
export default function AppWrapper(props) {
  return (
    <Provider store={store}>
      <ThemedApp {...props} />
    </Provider>
  );
}
