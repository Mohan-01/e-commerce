import CartItemService from '../services/cartItemService.js';

const getCartItems = async (req, res) => {
  try {
    const cartItems = await CartItemService.getAllCartItems();
    res.json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const cartItem = await CartItemService.addToCart(
      userId,
      productId,
      quantity
    );
    res.status(201).json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const removeFromCart = async (req, res) => {
  const cartItemId = req.params.id;
  try {
    await CartItemService.removeFromCart(cartItemId);
    res.json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default {
  getCartItems,
  addToCart,
  removeFromCart
};
