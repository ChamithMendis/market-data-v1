const axios = require("axios");
const marketModel = require("../models/marketModel");
const { SYMBOLS } = require("../config/symbols");
const { response } = require("express");

headers = {
  "Content-Type": "application/json",
  Authorization: "Token 16568609525e84e3550bab3c4110a221678b24a9", // a1b40767fce568f74a7eb77a65f6ce80de0b782c
};

module.exports = {
  fetchStartupData: () => {
    console.log("..... Initializing DB .....");
    return module.exports
      .saveSymbolMetaData()
      .then((metadataResults) => {
        console.log("Symbol metadata saved successfully:", metadataResults);

        return module.exports.saveSymbolPriceData();
      })
      .catch((error) => {
        console.error("Error during symbol data fetch:", error.message);
      });
  },
  saveSymbolMetaData: () => {
    try {
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
          return results;
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
  saveSymbolPriceData: () => {
    console.log("..... Start saving symbol price data .....");
    try {
      const apiUrl = "https://api.tiingo.com/tiingo/daily";

      const fetchPromises = SYMBOLS.map((symbol) => {
        return axios
          .get(`${apiUrl}/${symbol}/prices`, { headers: headers })
          .then((response) => {
            console.log(`Price data retreived for symbol ${symbol}:`);
            const symbolPriceData = { symbol, data: response.data[0] };
            return marketModel.saveSymbolPriceData(symbolPriceData);
          })
          .catch((error) => {
            console.error(
              `Data processing error for symbol: ${symbol}:`,
              error.message
            );
            return { symbol, error: error.message };
          });
      });
    } catch (error) {
      console.log(error);
    }
  },
};
