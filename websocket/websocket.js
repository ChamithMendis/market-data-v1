const WebSocket = require("ws");
const { SYMBOLS } = require("../config/symbols");

const apiKey = `1aca76ec7f534a8d95215897537aa7f8`;

module.exports = {
  connectToWebSocket: () => {
    const wsUrl = "wss://ws.twelvedata.com/v1/quotes/price";
    const ws = new WebSocket(`${wsUrl}?apikey=${apiKey}`);

    ws.on("open", () => {
      console.log("WebSocket connection established.");
      let allSymbols = SYMBOLS.join(",");
      const subscriptionMessage = JSON.stringify({
        action: "subscribe",
        params: {
          symbols: allSymbols,
        },
      });
      ws.send(subscriptionMessage);
      console.log(`Subscribed to real-time data`);
    });

    ws.on("message", (data) => {
      try {
        const message = JSON.parse(data);
        if (message.event == "price") {
          console.log(
            `Real-time data for ${message.symbol}: Price = ${message.price}, Time = ${message.timestamp}`
          );
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error.message);
      }
    });

    ws.on("close", () => {
      console.log("WebSocket connection closed.");
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error.message);
    });
  },
};
