import orderService from '../services/orderService.js';

const getMyOrders = async (req, res) => {
  try {
    const orders = await orderService.getMyOrders(req.user);
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to fetch orders' });
  }
};

const createOrder = async (req, res) => {
  try {
    const { userId, totalAmount } = req.body;
    const newOrder = await orderService.createOrder(userId, totalAmount);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create order' });
  }
};

const getOrderById = async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await orderService.getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch order' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch orders' });
  }
};

const updateOrder = async (req, res) => {
  const orderId = req.params.id;
  try {
    const updatedFields = req.body;
    const updatedOrder = await orderService.updateOrder(orderId, updatedFields);
    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to update order' });
  }
};

const deleteOrder = async (req, res) => {
  const orderId = req.params.id;
  try {
    await orderService.deleteOrder(orderId);
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to delete order' });
  }
};

export default {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
  deleteOrder,
  getMyOrders
};
