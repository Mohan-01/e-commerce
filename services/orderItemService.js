import OrderItem from '../models/OrderItem.js';

const getAllOrderItems = async () => {
  return await OrderItem.findAll();
};

const getOrderItemById = async orderItemId => {
  return await OrderItem.findByPk(orderItemId);
};

const createOrderItem = async orderItemData => {
  return await OrderItem.create(orderItemData);
};

const updateOrderItem = async (orderItemId, updatedOrderItemData) => {
  const orderItem = await getOrderItemById(orderItemId);
  if (!orderItem) {
    throw new Error('Order item not found');
  }
  await OrderItem.update(updatedOrderItemData, { where: { id: orderItemId } });
  return await getOrderItemById(orderItemId);
};

const deleteOrderItem = async orderItemId => {
  const orderItem = await getOrderItemById(orderItemId);
  if (!orderItem) {
    throw new Error('Order item not found');
  }
  await OrderItem.destroy({ where: { id: orderItemId } });
};

export default {
  getAllOrderItems,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem
};
