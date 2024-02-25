import Order from '../models/Order.js';

const getMyOrders = async user => {
  if (!user || !user.userId) {
    throw new Error('You need to first login to get all your orders');
  }
  const userId = user.userId;
  const orders = await Order.findAll({ where: { userId: userId } });
  console.log(orders);
  return orders;
};

const createOrder = async (userId, totalAmount, orderDate) => {
  try {
    const newOrder = await Order.create({ userId, totalAmount, orderDate });
    return newOrder;
  } catch (error) {
    throw new Error(error.message || 'Unable to create order');
  }
};

const getOrderById = async orderId => {
  try {
    const order = await Order.findByPk(orderId);
    return order;
  } catch (error) {
    throw new Error('Unable to fetch order');
  }
};

const getAllOrders = async () => {
  try {
    const orders = await Order.findAll();
    return orders;
  } catch (error) {
    throw new Error('Unable to fetch orders');
  }
};

const updateOrder = async (orderId, updatedFields) => {
  try {
    const order = await Order.findByPk(orderId);
    if (!order) {
      throw new Error('Order not found');
    }
    await order.update(updatedFields);
    return order;
  } catch (error) {
    throw new Error('Unable to update order');
  }
};

const deleteOrder = async orderId => {
  try {
    const order = await Order.findByPk(orderId);
    if (!order) {
      throw new Error('Order not found');
    }
    await order.destroy();
  } catch (error) {
    throw new Error('Unable to delete order');
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
