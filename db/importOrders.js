import fs from 'fs';
import path from 'path';

import db from '../config/db.js';
import Order from '../models/Order.js';
import orderService from '../services/orderService.js';

db.testConnection();

async function importOrders() {
  const filePath = path.join(process.cwd(), '..', 'data', 'orders.json');
  console.log(filePath);
  const orders = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  for (const order of orders) {
    await orderService.createOrder(
      order.userId,
      order.totalAmount,
      order.orderDate
    );
  }
  console.log('===========================================');
  console.log('Orders imported successfully!');
  console.log('===========================================');
  Order.sync();
  process.exit();
}

const deleteAllOrders = async () => {
  try {
    // Check if the Order table exists before attempting deletion
    const tableExists = await Order.sync();
    if (tableExists) {
      await Order.destroy({
        where: {},
        truncate: true,
        cascade: true
      });
      console.log('===========================================');
      console.log('All Orders deleted successfully');
      console.log('===========================================');
    } else {
      console.log('===========================================');
      console.log('Order table does not exist');
      console.log('===========================================');
    }
  } catch (error) {
    console.log('===========================================');
    console.error('Error deleting Orders:', error);
    console.log('===========================================');
  }
};

if (process.argv[2] == '--i') {
  //   deleteAllOrders();
  importOrders();
}
