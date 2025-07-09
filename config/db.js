import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(dbConfig);

// A simple function to test the connection on startup.
async function testConnection() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    // Exit process on connection failure to avoid running the app with a bad DB connection.
    process.exit(1);
  } finally {
    if (connection) connection.release();
  }
}

testConnection();

export default pool;