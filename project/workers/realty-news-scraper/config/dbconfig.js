require('dotenv').config();
const harperive = require('harperive');

const DB_CONFIG = {
  harperHost: process.env.HARPERDB_INSTANCE_URL,
  username: process.env.HARPERDB_INSTANCE_USERNAME,
  password: process.env.HARPERDB_INSTANCE_PASSWORD,
  schema: process.env.HARPERDB_INSTANCE_SCHEMA
};

const Client = harperive.Client;
const db = new Client(DB_CONFIG);

module.exports = db;