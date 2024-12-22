const marketService = require('../services/marketService');

module.exports = {
  test: (req, res) => {
    try {
        marketService.test().then((response) => {
            res.json(response);
        }).catch((error) => {
            res.status(500).json({ error: error.message });
        });
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
  },
  getSymbolMetaData: (req, res) => {
    try {
        const { symbolName } = req.params;
        marketService.getSymbolMetaData(symbolName).then((response) => {
            // save to db
            res.json(response);
        });
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
  },
  getSymbolLatestPriceData: (req, res) => {
    try {
        const { symbolName } = req.params;
        marketService.getSymbolLatestPriceData(symbolName).then((response) => {
            // save to db
            res.json(response);
        });
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
  },
  getSymbolHistoryData: (req, res) => {
    try {
        const { symbolName } = req.params;
        marketService.getSymbolHistoryData(req, symbolName).then((response) => {
            // save to db
            res.json(response);
        });
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
  },
  getSymbolHistoryDataToCsv: (req, res) => {
    try {
        const { symbolName } = req.params;
        marketService.getSymbolHistoryDataToCsv(req, symbolName).then((response) => {
            // save to db
            res.json(response);
        });
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
  },
  getSymbolData: (req, res) => {
    res.json(marketService.getSymbolData());
  },
//   createTask: (req, res) => {
//     const task = req.body;
//     taskService.createTask(task);
//     res.status(201).json({ message: 'Task created', task });
//   },
//   deleteTask: (req, res) => {
//     const { id } = req.params;
//     taskService.removeTask(id);
//     res.json({ message: 'Task deleted' });
//   },
};
