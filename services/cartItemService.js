import Cart from '../models/Cart.js';

const getAllCartItems = async () => {
  try {
    const cartItems = await Cart.findAll();
    return cartItems;
  } catch (error) {
    throw new Error('Failed to fetch cart items');
  }
};

const addToCart = async (userId, productId, quantity) => {
  try {
    const cartItem = await Cart.create({ userId, productId, quantity });
    return cartItem;
  } catch (error) {
    throw new Error('Failed to add item to cart');
  }
};

const removeFromCart = async cartItemId => {
  try {
    await Cart.destroy({ where: { id: cartItemId } });
  } catch (error) {
    throw new Error('Failed to remove item from cart');
  }
};

export default {
  getAllCartItems,
  addToCart,
  removeFromCart
};
