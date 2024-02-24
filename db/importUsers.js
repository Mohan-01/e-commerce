import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';

import User from '../models/User.js';
import db from '../config/db.js';
import authService from '../services/authService.js';

db.testConnection();

async function importUsers() {
  const filePath = path.join(process.cwd(), '..', 'data', 'users.json');
  console.log(filePath);
  const users = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  for (const user of users) {
    await authService.signup(
      user.username,
      user.password,
      user.email,
      user.role
    );
  }
  console.log('===========================================');
  console.log('Users imported successfully!');
  console.log('===========================================');
  User.sync();
  process.exit();
}

const deleteAllUsers = async () => {
  try {
    // Check if the User table exists before attempting deletion
    const tableExists = await User.sync();
    if (tableExists) {
      await User.destroy({
        where: {},
        truncate: true,
        cascade: true
      });
      console.log('===========================================');
      console.log('All users deleted successfully');
      console.log('===========================================');
    } else {
      console.log('===========================================');
      console.log('User table does not exist');
      console.log('===========================================');
    }
  } catch (error) {
    console.log('===========================================');
    console.error('Error deleting users:', error);
    console.log('===========================================');
  }
};

if (process.argv[2] == '--i') {
  deleteAllUsers();
  importUsers();
}
