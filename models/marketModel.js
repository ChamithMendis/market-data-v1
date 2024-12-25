const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "marketDB",
  password: "password",
  port: 5432,
});

module.exports = {
  /**
   * Inserts a new symbol or updates the existing symbol data.
   * @param {string} ticker - Symbol Code.
   * @param {string} description - Price value.
   * @param {Date} start_date - Start Date.
   * @param {Date} end_date - End Date.
   * @param {string} name - Symbol Name.
   * @param {string} exchange_code - Exchange Code.
   * @param {number} open -  Open Price.
   * @param {number} close - Close Price.
   * @param {number} high - Highest Price.
   * @param {number} low - Lowest Price.
   * @param {number} market - Market Price  .
   */

  saveSymbolMetaData: (symbolData) => {
    try {
      const ticker = symbolData.data.ticker;
      const description = symbolData.data.description;
      const start_date = symbolData.data.start_date;
      const end_date = symbolData.data.end_date;
      const name = symbolData.data.name;
      const exchangeCode = symbolData.data.exchangeCode;

      const query = `INSERT INTO symbol_data (ticker, description, start_date, end_date, name, exchange_code) VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (ticker)
        DO UPDATE SET
        description = EXCLUDED.description,
        start_date = EXCLUDED.start_date,
        end_date = EXCLUDED.end_date,
        name = EXCLUDED.name,
        exchange_code = EXCLUDED.exchange_code`;
      const values = [
        ticker,
        description,
        start_date,
        end_date,
        name,
        exchangeCode,
      ];

      return pool
        .query(query, values)
        .then((res) => {
          console.log(`Data saved for symbol ${symbolData.symbol}`);
          return res;
        })
        .catch((err) => {
          console.log(`Error saving data for symbol ${symbolData.symbol}`);
          throw err;
        });
    } catch (error) {
      console.log(error);
    }
  },
  saveSymbolPriceData: (symbolPriceData) => {
    try {
      const ticker = symbolPriceData.symbol;
      const date = symbolPriceData.data?.date
        ? new Date(symbolPriceData.data.date)
        : null;
      const open = symbolPriceData.data?.open
        ? symbolPriceData.data?.open
        : null;
      const close = symbolPriceData.data?.close
        ? symbolPriceData.data?.close
        : null;
      const high = symbolPriceData.data?.hig
        ? symbolPriceData.data?.high
        : null;
      const low = symbolPriceData.data?.low ? symbolPriceData.data?.low : null;
      const market = symbolPriceData.data?.market
        ? symbolPriceData.data?.market
        : null;

      const query = `INSERT INTO symbol_price_data (ticker, date, open, close, high, low, market) VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (ticker)
        DO UPDATE SET
        date = EXCLUDED.date,
        open = EXCLUDED.open,
        close = EXCLUDED.close,
        high = EXCLUDED.high,
        low = EXCLUDED.low,
        market = EXCLUDED.market`;
      const values = [ticker, date, open, close, high, low, market];

      return pool
        .query(query, values)
        .then((res) => {
          console.log(`Price data saved for symbol ${symbolPriceData.symbol}`);
          return res;
        })
        .catch((err) => {
          console.log(
            `Error saving Price data for symbol ${symbolPriceData.symbol}`
          );
          throw err;
        });
    } catch (error) {
      console.log(error);
    }
  },
};
