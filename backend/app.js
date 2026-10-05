const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const PORT = 5000;

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};

app.get("/api", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      "SELECT 'Hello from MySQL database' AS message"
    );

    await connection.end();

    res.json({
      message: "Backend connected to database",
      database: rows[0].message
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);

    res.status(500).json({
      message: "Backend could not connect to database"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});