// load .env file
require('dotenv').config({ path: __dirname + "/.env" });

// init Zenaton client
const { Client } = require("zenaton");

module.exports = new Client(
  process.env.ZENATON_APP_ID,
  process.env.ZENATON_API_TOKEN,
  process.env.ZENATON_APP_ENV
);