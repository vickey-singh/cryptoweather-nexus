# 🌦️ CryptoWeather Nexus

**CryptoWeather Nexus** is a dynamic Next.js dashboard that brings together weather updates, live cryptocurrency data, and trending crypto news — all in one place. Built for both functionality and aesthetics, it provides real-time price updates via WebSockets, detailed pages for cities and coins, and the ability to manage favorites.

---

## 🚀 Features

- 🌍 **Weather Data** from OpenWeatherMap API
- 💰 **Cryptocurrency Prices** using CoinCap API (with WebSocket for real-time updates)
- 📰 **Crypto News** via NewsData.io
- 🧠 **Redux Toolkit** for state management
- 🎨 **Tailwind CSS** for UI styling
- ⚡ **Dynamic Routing** with detail pages for weather and crypto
- ⭐ **Favorites** management (crypto)
- ☁️ **Deployed** on Vercel

---

## 📁 Project Structure

```bash
/cryptoweather-nexus
├── pages
│   ├── index.js                # Home dashboard
│   ├── crypto/[id].js          # Dynamic detail page for each crypto
│   └── weather/[id].js        # Dynamic detail page for each city
├── components                 # Reusable components
├── store                      # Redux store and slices
│   ├── weatherSlice.js
│   ├── cryptoSlice.js
│   ├── newsSlice.js
│   ├── websocketSlice.js
│   └── favoritesSlice.js
├── public                     # Static files
└── styles                     # Tailwind + global CSS
```

---

## ⚙️ Setup Instructions

### 1. **Clone the Repo**
```bash
git clone https://github.com/vickey-singh/cryptoweather-nexus.git
cd cryptoweather-nexus
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Environment Variables**
Create a `.env.local` file:
```env
NEXT_PUBLIC_WEATHER_API_KEY=your_openweather_api_key
NEXT_PUBLIC_NEWS_API_KEY=your_newsdata_api_key
```

> Make sure you have valid API keys for OpenWeatherMap and NewsData.io.

### 4. **Run the App**
```bash
npm run dev
```
Visit: [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deployment

### 🔹 **Vercel**
1. Go to [https://vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set the required environment variables in **Project Settings**
4. Click **Deploy**

---

## 🧠 Design Decisions

### 🔧 Tech Stack Justification:
- **Next.js** for fast, SEO-friendly React framework
- **Tailwind CSS** for utility-first and responsive design
- **Redux Toolkit** to manage global app state cleanly
- **WebSocket** for real-time crypto price updates
- **Dynamic Routing** to scale individual city/crypto detail pages

### 💡 UI/UX Considerations:
- Dark themed UI for modern feel
- Responsive layout for mobile/desktop
- Clean information blocks for readability

---

### 🔗 Live Demo
[Check the Live Site]


## ✍️ Author

Made with 💻 by [Vickey Singh]

---

## 📜 License

This project is licensed under the MIT License.

## 📧 Contact
For any queries or collaboration opportunities, reach out via the contact section on the website.

📧 Email: vickeykumarsingh.edu@gmail.com