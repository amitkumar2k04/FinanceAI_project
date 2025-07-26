import mysql from "mysql2/promise";
import dotenv from 'dotenv';

dotenv.config();

// 1: to connect to db
const db_connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // The DB port is optional; default MySQL port 3306.  Use DB_PORT from
  // environment variables to override.
  port: process.env.DB_PORT || 3306
});
// console.log("Database connected successfully");

export default db_connection;
