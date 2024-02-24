import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';

const filePath = process.cwd().includes('db')
  ? path.join(process.cwd(), '..', '.env')
  : path.join(process.cwd(), '.env');
console.log({ filePath });

dotenv.config({ path: filePath });

const sequelize = new Sequelize({
  dialect: 'postgres',
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: 'localhost',
  port: 5432
});

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync();
    console.log('Tables created successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Export the initialized Sequelize instance
export default { sequelize, testConnection };
