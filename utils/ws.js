let socket;

export function initWebSocket(onMessageCallback) {
  socket = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin,ethereum");

  socket.onopen = () => {
    console.log("✅ WebSocket Connected");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessageCallback(data); // e.g., { bitcoin: "58000.42" }
  };

  socket.onclose = () => {
    console.log("❌ WebSocket Disconnected");
  };

  socket.onerror = (error) => {
    console.error("WebSocket Error:", error);
  };
}

export function closeWebSocket() {
  if (socket) socket.close();
}
