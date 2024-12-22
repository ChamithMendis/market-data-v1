const marketModel = require('../models/marketModel');
const axios = require('axios');
headers = {
    'Content-Type': 'application/json',
    'Authorization' : 'Token 16568609525e84e3550bab3c4110a221678b24a9'
    };

module.exports = {
    test: () => {
        try {
            return axios.get("https://api.tiingo.com/api/test/", {headers: headers}).then((response) => {
                return response.data;
            }).catch((error) => {
                console.error('Error fetching test end point:', error.message);
            throw new Error('Failed to test');
            });
        } catch (error) {
            console.error('Error fetching test end point:', error.message);
            throw new Error('Failed to test');
        }
    },
    getSymbolMetaData: (symbolName) => {
        try {
            return axios.get(`https://api.tiingo.com/tiingo/daily/${symbolName}`, {headers: headers}).then((response) => {
                return response.data;
            }).catch((error) => {
                console.error(`Error fetching meta data for: ${symbolName}`, error.message);
            throw new Error('Failed to get price data');
            });
        } catch (error) {
            console.error('Error doing rest call', error.message);
            throw new Error('Failed to do rest call');
        }
    },
    getSymbolLatestPriceData: (symbolName) => {
        try {
            return axios.get(`https://api.tiingo.com/tiingo/daily/${symbolName}/prices`, {headers: headers}).then((response) => {
                return response.data;
            }).catch((error) => {
                console.error(`Error fetching price data for: ${symbolName}`, error.message);
            throw new Error('Failed to get price data');
            });
        } catch (error) {
            console.error('Error doing rest call', error.message);
            throw new Error('Failed to do rest call');
        }
    },
    getSymbolHistoryData: (req, symbolName) => {
        try {
            const startDate = req.body.startDate;
            const endDate = req.body.endDate;
            return axios.get(`https://api.tiingo.com/tiingo/daily/${symbolName}/prices?startDate=${startDate}&endDate=${endDate}`, {headers: headers}).then((response) => {
                return response.data;
            }).catch((error) => {
                console.error(`Error fetching price data for: ${symbolName}`, error.message);
            throw new Error('Failed to get price data');
            });
        } catch (error) {
            console.error('Error doing rest call', error.message);
            throw new Error('Failed to do rest call');
        }
    },
    getSymbolHistoryDataToCsv: (req, symbolName) => {
        try {
            const startDate = req.body.startDate;
            const endDate = req.body.endDate;
            return axios.get(`https://api.tiingo.com/tiingo/daily/${symbolName}/prices?startDate=${startDate}&endDate=${endDate}&format=csv&resampleFreq=monthly`, {headers: headers}).then((response) => {
                return response.data;
            }).catch((error) => {
                console.error(`Error fetching price data for: ${symbolName}`, error.message);
            throw new Error('Failed to get price data');
            });
        } catch (error) {
            console.error('Error doing rest call', error.message);
            throw new Error('Failed to do rest call');
        }
    },
    getSymbolData: () => {
        return marketModel.getSymbolData()
    }
};
