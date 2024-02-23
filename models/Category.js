import db from '../config/db.js';
import { DataTypes } from 'sequelize';

const Category = db.sequelize.define(
  'Category',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    tableName: 'categories',
    timestamps: false
  }
);

export default Category;
