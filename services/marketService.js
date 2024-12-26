const marketModel = require("../models/marketModel");
const axios = require("axios");
const logger = require("../utils/logger");

headers = {
  "Content-Type": "application/json",
  Authorization: "Token 16568609525e84e3550bab3c4110a221678b24a9",
};

module.exports = {
  test: () => {
    try {
      return axios
        .get("https://api.tiingo.com/api/test/", { headers: headers })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.error("Error fetching test end point:", error.message);
          throw new Error("Failed to test");
        });
    } catch (error) {
      console.error("Error fetching test end point:", error.message);
      throw new Error("Failed to test");
    }
  },
  getSymbolMetaData: (symbolName) => {
    try {
      logger.info(`Fetching metadata from tiingo api for symbol ${symbolName}`);
      return axios
        .get(`https://api.tiingo.com/tiingo/daily/${symbolName}`, {
          headers: headers,
        })
        .then((response) => {
          marketModel.saveSymbolData(response.data);
          logger.info(
            `Data from tiingo saved successfully in the db for symbol ${symbolName}`
          );
          return response.data;
        })
        .catch((error) => {
          logger.error(
            `Error fetching symbol data from tiingo for symbol ${symbolName}: ${error.message}`
          );
          console.error(
            `Error fetching meta data for: ${symbolName}`,
            error.message
          );
          throw new Error("Failed to get price data");
        });
    } catch (error) {
      logger.error(
        `Error fetching symbol data from tiingo for symbol ${symbolName}: ${error.message}`
      );
      console.error("Error doing rest call", error.message);
      throw new Error("Failed to do rest call");
    }
  },
  getSymbolLatestPriceData: (symbolName) => {
    try {
      logger.info(
        `Fetching price data from tiingo api for symbol ${symbolName}`
      );
      return axios
        .get(`https://api.tiingo.com/tiingo/daily/${symbolName}/prices`, {
          headers: headers,
        })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          logger.error(
            `Error fetching price data from tiingo for symbol ${symbolName}: ${error.message}`
          );
          console.error(
            `Error fetching price data for: ${symbolName}`,
            error.message
          );
          throw new Error("Failed to get price data");
        });
    } catch (error) {
      logger.error(
        `Error fetching price data from tiingo for symbol ${symbolName}: ${error.message}`
      );
      console.error("Error doing rest call", error.message);
      throw new Error("Failed to do rest call");
    }
  },
  getSymbolHistoryData: (req, symbolName) => {
    try {
      const startDate = req.body.startDate;
      const endDate = req.body.endDate;
      logger.info(
        `Fetching history data from tiingo api for symbol ${symbolName}`
      );
      return axios
        .get(
          `https://api.tiingo.com/tiingo/daily/${symbolName}/prices?startDate=${startDate}&endDate=${endDate}`,
          { headers: headers }
        )
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          logger.error(
            `Error fetching history data from tiingo for symbol ${symbolName}: ${error.message}`
          );
          console.error(
            `Error fetching price data for: ${symbolName}`,
            error.message
          );
          throw new Error("Failed to get price data");
        });
    } catch (error) {
      logger.error(
        `Error fetching history data from tiingo for symbol ${symbolName}: ${error.message}`
      );
      console.error("Error doing rest call", error.message);
      throw new Error("Failed to do rest call");
    }
  },
  getSymbolHistoryDataToCsv: (req, symbolName) => {
    try {
      const startDate = req.body.startDate;
      const endDate = req.body.endDate;
      logger.info(
        `Extracting symbol history data from tiingo api for symbol ${symbolName}`
      );
      return axios
        .get(
          `https://api.tiingo.com/tiingo/daily/${symbolName}/prices?startDate=${startDate}&endDate=${endDate}&format=csv&resampleFreq=monthly`,
          { headers: headers }
        )
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          logger.error(
            `Error extracting history data from tiingo for symbol ${symbolName}: ${error.message}`
          );
          console.error(
            `Error fetching history data for: ${symbolName}`,
            error.message
          );
          throw new Error("Failed to get price data");
        });
    } catch (error) {
      logger.error(
        `Error extracting history data from tiingo for symbol ${symbolName}: ${error.message}`
      );
      console.error("Error doing rest call", error.message);
      throw new Error("Failed to do rest call");
    }
  },
  getSavedSymbolsMetaData: () => {
    try {
      logger.info(`Fetching metadata from db for all symbols`);
      return marketModel
        .getSavedSymbolsMetaData()
        .then((symbols) => {
          if (!symbols.length) {
            throw new Error("No symbols found");
          }
          return symbols;
        })
        .catch((error) => {
          logger.error(
            `Error fetching metadata from DB for all symbols: ${error.message}`
          );
          console.error("Error doing rest call", error.message);
          throw new Error("Failed to do rest call");
        });
    } catch (error) {
      logger.error(
        `Error fetching metadata from DB for all symbols: ${error.message}`
      );
      console.error("Error doing rest call", error.message);
      throw new Error("Failed to do rest call");
    }
  },
  getSymbolByName: (symbolName) => {
    try {
      logger.info(`Fetching metadata from DB for symbol ${symbolName}`);
      return marketModel
        .getSymbolByName(symbolName)
        .then((symbol) => {
          if (!symbol) {
            logger.info(`No data found from DB for symbol ${symbolName}`);
            throw new Error("No symbol found");
          }
          return symbol;
        })
        .catch((error) => {
          logger.error(
            `Error fetching metadata from DB for symbol ${symbolName}: ${error.message}`
          );
          console.error("Error doing rest call", error.message);
          throw new Error("Failed to do rest call");
        });
    } catch (error) {
      logger.error(
        `Error fetching metadata from DB for symbol ${symbolName}: ${error.message}`
      );
      console.error("Error doing rest call", error.message);
      throw new Error("Failed to do rest call");
    }
  },
  getSavedSymbolPriceData: (symbolName) => {
    try {
      logger.info(`Fetching pricedata from DB for symbol ${symbolName}`);
      return marketModel
        .getSavedSymbolPriceData(symbolName)
        .then((symbolPriceData) => {
          if (!symbolPriceData) {
            logger.into(
              `No symbol price data found from DB for symbol ${symbolName}: ${error.message}`
            );
            throw new Error("No symbol price data found");
          }
          return symbolPriceData;
        })
        .catch((error) => {
          logger.error(
            `No symbol price data found from DB for symbol ${symbolName}: ${error.message}`
          );
          console.error("Error doing rest call", error.message);
          throw new Error("Failed to do rest call");
        });
    } catch (error) {
      logger.error(
        `No symbol price data found from DB for symbol ${symbolName}: ${error.message}`
      );
      console.error("Error doing rest call", error.message);
      throw new Error("Failed to do rest call");
    }
  },
};
