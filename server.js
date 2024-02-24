import dotenv from 'dotenv';

import app from './app.js';
import db from './config/db.js';

dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 3000;

db.testConnection();

// running server on PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
