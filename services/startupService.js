const axios = require("axios");
const marketModel = require("../models/marketModel");
const { SYMBOLS } = require("../config/symbols");

headers = {
  "Content-Type": "application/json",
  Authorization: "Token 16568609525e84e3550bab3c4110a221678b24a9",
};

module.exports = {
  fetchStartupData: () => {
    try {
      console.log("..... Initializing DB .....");
      const apiUrl = "https://api.tiingo.com/tiingo/daily";

      const fetchPromises = SYMBOLS.map((symbol) => {
        return axios
          .get(`${apiUrl}/${symbol}`, { headers: headers })
          .then((response) => {
            console.log(`Data retreived for symbol ${symbol}:`);
            const symbolData = { symbol, data: response.data };
            return marketModel.saveSymbolMetaData(symbolData);
          })
          .catch((error) => {
            console.error(
              `Data processing error for symbol: ${symbol}:`,
              error.message
            );
            return { symbol, error: error.message };
          });
      });

      return Promise.all(fetchPromises)
        .then((results) => {
          console.log("All symbol data fetched:");
        })
        .catch((error) => {
          console.error("Error fetching symbol data:", error.message);
          throw error;
        });
    } catch (error) {
      console.log(error);
      return {};
    }
  },
};
