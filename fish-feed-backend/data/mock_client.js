const WebSocket = require("ws");

// Connect to the WebSocket server
const ws = new WebSocket("ws://localhost:5000/ws/sensor");

// Log connection success
ws.on("open", function open() {
  console.log("✅ WebSocket connected to server");
});

// Log any messages received from the server
ws.on("message", function incoming(data) {
  console.log(
    "📥 Received data from server:",
    JSON.stringify(JSON.parse(data.toString()), null, 4)
  );
});

// Log errors
ws.on("error", function error(err) {
  console.error("❌ WebSocket error:", err);
});

// Log close event
ws.on("close", function close() {
  console.log("🔌 WebSocket connection closed");
});
