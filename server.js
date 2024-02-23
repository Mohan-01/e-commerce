import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'path';

import app from './app.js';
import pool from './config/db.js';

dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 3000;

// Test database connection
pool.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error('Error connecting to database:', err.stack);
    return;
  }
  console.log('Connected to database:', result.rows[0].now);

  // Read the schema.sql file
  const schemaSql = fs.readFileSync(
    path.join(process.cwd(), 'db', 'schema.sql'),
    'utf8'
  );

  // Execute the schema.sql script
  pool
    .query(schemaSql)
    .then(() => console.log('Schema script executed successfully'))
    .catch(err => console.error('Error executing schema script:', err));
});

// running server on PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
