import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const sslMode = (process.env.DB_SSL_MODE || "DISABLED").toUpperCase();
const useSsl = ["REQUIRED", "TRUE", "1"].includes(sslMode);

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || 3306),
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
  ...(useSsl ? { ssl: { rejectUnauthorized: false } } : {}),
});

export default db;
