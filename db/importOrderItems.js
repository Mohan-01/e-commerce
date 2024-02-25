import fs from 'fs';
import path from 'path';

import db from '../config/db.js';
import OrderItem from '../models/OrderItem.js';
import orderItemService from '../services/orderItemService.js';

db.testConnection();

async function importOrders() {
  const filePath = path.join(process.cwd(), '..', 'data', 'orderItems.json');
  console.log(filePath);
  const orders = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  for (const order of orders) {
    await orderItemService.createOrderItem(order);
  }
  console.log('===========================================');
  console.log('OrderItem imported successfully!');
  console.log('===========================================');
  OrderItem.sync();
  process.exit();
}

const deleteAllOrders = async () => {
  try {
    // Check if the Order table exists before attempting deletion
    const tableExists = await OrderItem.sync();
    if (tableExists) {
      await OrderItem.destroy({
        where: {},
        truncate: true,
        cascade: true
      });
      console.log('===========================================');
      console.log('All OrderItem deleted successfully');
      console.log('===========================================');
    } else {
      console.log('===========================================');
      console.log('OrderItem table does not exist');
      console.log('===========================================');
    }
  } catch (error) {
    console.log('===========================================');
    console.error('Error deleting OrderItem:', error);
    console.log('===========================================');
  }
};

if (process.argv[2] == '--i') {
  //   deleteAllOrders();
  importOrders();
}
