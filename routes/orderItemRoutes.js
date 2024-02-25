import express from 'express';
import orderItemController from '../controllers/orderItemController.js';

const router = express.Router();

router
  .route('/')
  .get(orderItemController.getOrderItems)
  .post(orderItemController.createOrderItem);
router
  .route('/:id')
  .get(orderItemController.getOrderItemById)
  .patch(orderItemController.updateOrderItem)
  .delete(orderItemController.deleteOrderItem);

export default router;
