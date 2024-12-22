const express = require('express');
const marketController = require('../controllers/marketController');

const router = express.Router();

/* ---------- est route [Start] ---------- */
router.get('/test', marketController.test);
/* ---------- est route [End] ---------- */

/* ---------- market symbol price data routes [Start] ---------- */

router.get('/getSymbol/:symbolName', marketController.getSymbolMetaData); // get symbol meta data
router.get('/getSymbolPriceData/:symbolName', marketController.getSymbolLatestPriceData); // get symbol price latest data
router.get('/getSymbolHistoryData/:symbolName', marketController.getSymbolHistoryData); // get symbol price history data
router.get('/getSymbolHistoryDataToCsv/:symbolName', marketController.getSymbolHistoryDataToCsv); // get symbol price history data to csv

/* ---------- market data routes [End] ---------- */

module.exports = router;
