const marketService = require("../services/marketService");

module.exports = {
  test: (req, res) => {
    try {
      marketService
        .test()
        .then((response) => {
          res.status(200).json({
            success: true,
            data: response,
          });
        })
        .catch((error) => {
          res.status(500).json({
            success: false,
            message: "Failed test route",
            error: error.message,
          });
        });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getSymbolMetaData: (req, res) => {
    try {
      const { symbolName } = req.params;
      marketService.getSymbolMetaData(symbolName).then((response) => {
        res.status(200).json({
          success: true,
          data: response,
        });
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve symbol meta data from tiingo",
        error: error.message,
      });
    }
  },
  getSymbolLatestPriceData: (req, res) => {
    try {
      const { symbolName } = req.params;
      marketService.getSymbolLatestPriceData(symbolName).then((response) => {
        res.status(200).json({
          success: true,
          data: response,
        });
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve symbol price data from tiingo",
        error: error.message,
      });
    }
  },
  getSymbolHistoryData: (req, res) => {
    try {
      const { symbolName } = req.params;
      marketService.getSymbolHistoryData(req, symbolName).then((response) => {
        res.status(200).json({
          success: true,
          data: response,
        });
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve symbol history data from tiingo",
        error: error.message,
      });
    }
  },
  getSymbolHistoryDataToCsv: (req, res) => {
    try {
      const { symbolName } = req.params;
      marketService
        .getSymbolHistoryDataToCsv(req, symbolName)
        .then((response) => {
          res.status(200).json({
            success: true,
            data: response,
          });
        });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to extract symbol price data from tiingo to csv",
        error: error.message,
      });
    }
  },
  getSavedSymbolsMetaData: (req, res) => {
    try {
      marketService.getSavedSymbolsMetaData().then((symbols) => {
        res.status(200).json({
          success: true,
          data: symbols,
        });
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve symbols",
        error: error.message,
      });
    }
  },
  getSymbolByName: (req, res) => {
    try {
      const { symbolName } = req.params;
      marketService.getSymbolByName(symbolName).then((symbol) => {
        res.status(200).json({
          success: true,
          data: symbol,
        });
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve symbol",
        error: error.message,
      });
    }
  },
  getSavedSymbolPriceData: (req, res) => {
    try {
      const { symbolName } = req.params;
      marketService
        .getSavedSymbolPriceData(symbolName)
        .then((symbolPriceData) => {
          res.status(200).json({
            success: true,
            data: symbolPriceData,
          });
        });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve symbol price data",
        error: error.message,
      });
    }
  },
};
