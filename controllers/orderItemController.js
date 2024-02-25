import OrderItemService from '../services/orderItemService.js';

const getOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItemService.getAllOrderItems();
    res.json(orderItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getOrderItemById = async (req, res) => {
  const orderItemId = req.params.id;
  try {
    const orderItem = await OrderItemService.getOrderItemById(orderItemId);
    if (!orderItem) {
      return res.status(404).json({ error: 'Order item not found' });
    }
    res.json(orderItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createOrderItem = async (req, res) => {
  try {
    const newOrderItem = await OrderItemService.createOrderItem(req.body);
    res.status(201).json(newOrderItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

const updateOrderItem = async (req, res) => {
  const orderItemId = req.params.id;
  try {
    const updatedOrderItem = await OrderItemService.updateOrderItem(
      orderItemId,
      req.body
    );
    res.json({ message: 'Order item updated successfully', updatedOrderItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteOrderItem = async (req, res) => {
  const orderItemId = req.params.id;
  try {
    await OrderItemService.deleteOrderItem(orderItemId);
    res.json({ message: 'Order item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default {
  getOrderItems,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem
};
