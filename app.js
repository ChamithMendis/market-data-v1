const express = require("express");
const bodyParser = require("body-parser");
const marketRoutes = require("./routes/marketRoutes");
const startupService = require("./services/startupService");
const priceWebSocketService = require("./websocket/websocket");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/market", marketRoutes);

// Initializing the DB
startupService
  .fetchStartupData()
  .then((data) => {
    console.log("..... DB Initialized successfully .....");
    priceWebSocketService.connectToWebSocket();
  })
  .catch((error) => {
    console.error("..... Failed to initialize DB .....", error.message);
  });

module.exports = app;
