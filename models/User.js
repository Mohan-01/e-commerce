import { DataTypes } from 'sequelize';
import db from '../config/db.js';

// Define the ENUM type user_role
const userRoleEnum = ['admin', 'merchant', 'customer'];

// Define the User model
const User = db.sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    role: {
      type: DataTypes.ENUM(...userRoleEnum),
      defaultValue: 'customer'
    }
  },
  {
    tableName: 'users',
    timestamps: false
  }
);

User.sync()
  .then(() => console.log('User Model synced'))
  .catch(err => console.log(err));

export default User;
