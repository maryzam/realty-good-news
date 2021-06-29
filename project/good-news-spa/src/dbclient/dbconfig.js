import env from "react-dotenv";
import harperive from "harperive";

const DB_CONFIG = {
  harperHost: env.HARPERDB_INSTANCE_URL,
  username: env.HARPERDB_INSTANCE_USERNAME,
  password: env.HARPERDB_INSTANCE_PASSWORD,
  schema: env.HARPERDB_INSTANCE_SCHEMA
};

const Client = harperive.Client;
const dbClient = new Client(DB_CONFIG);

export default dbClient;