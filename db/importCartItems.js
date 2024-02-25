import fs from 'fs';
import path from 'path';

import db from '../config/db.js';
import Cart from '../models/Cart.js';
import cartItemService from '../services/cartItemService.js';

db.testConnection();

async function importOrders() {
  const filePath = path.join(process.cwd(), '..', 'data', 'cartItems.json');
  console.log(filePath);
  const cartItems = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  for (const cartItem of cartItems) {
    await cartItemService.addToCart(
      cartItem.userId,
      cartItem.productId,
      cartItem.quantity
    );
  }
  console.log('===========================================');
  console.log('cartItems imported successfully!');
  console.log('===========================================');
  Cart.sync();
  process.exit();
}

const deleteAllOrders = async () => {
  try {
    // Check if the Order table exists before attempting deletion
    const tableExists = await Cart.sync();
    if (tableExists) {
      await Cart.destroy({
        where: {},
        truncate: true,
        cascade: true
      });
      console.log('===========================================');
      console.log('All cartItems deleted successfully');
      console.log('===========================================');
    } else {
      console.log('===========================================');
      console.log('cartItems table does not exist');
      console.log('===========================================');
    }
  } catch (error) {
    console.log('===========================================');
    console.error('Error deleting cartItems:', error);
    console.log('===========================================');
  }
};

if (process.argv[2] == '--i') {
  // deleteAllOrders();
  importOrders();
}
