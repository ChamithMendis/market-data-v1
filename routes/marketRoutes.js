const express = require("express");
const marketController = require("../controllers/marketController");

const router = express.Router();

/* ---------- test route [Start] ---------- */
router.get("/test", marketController.test);
/* ---------- test route [End] ---------- */

/* ---------- market symbol price data routes [Start] ---------- */

// get symbol meta data from tiingo
router.get("/getSymbol/:symbolName", marketController.getSymbolMetaData);

// get symbol price latest data from tiingo
router.get(
  "/getSymbolPriceData/:symbolName",
  marketController.getSymbolLatestPriceData
);

// get symbol price history data from tiingo
router.get(
  "/getSymbolHistoryData/:symbolName",
  marketController.getSymbolHistoryData
);

// get symbol price history data to csv from tiingo
router.get(
  "/getSymbolHistoryDataToCsv/:symbolName",
  marketController.getSymbolHistoryDataToCsv
);

/* ---------- market data routes [End] ---------- */

/* ---------- fetch saved data from db [Start] ---------- */

router.get("/getSavedSymbols", marketController.getSavedSymbolsMetaData);

router.get("/getSymbolByName/:symbolName", marketController.getSymbolByName);

router.get(
  "/getSavedSymbolPriceData/:symbolName",
  marketController.getSavedSymbolPriceData
);

/* ---------- fetch saved data from db [End] ---------- */

module.exports = router;
