import db from '../config/db.js';
import { DataTypes } from 'sequelize';

const OrderItem = db.sequelize.define(
  'OrderItem',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orders', // The referenced model
        key: 'id' // The referenced key
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products', // The referenced model
        key: 'id' // The referenced key
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'order_items',
    timestamps: false
  }
);

export default OrderItem;
