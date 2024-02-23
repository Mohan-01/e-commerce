import dotenv from "dotenv";

import app from "./app.mjs";
import pool from "./config/db.js";

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 3000;

// Test database connection
pool.query("SELECT NOW()", (err, result) => {
  if (err) {
    console.error("Error connecting to database:", err.stack);
    return;
  }
  console.log("Connected to database:", result.rows[0].now);
});

// running server on PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
