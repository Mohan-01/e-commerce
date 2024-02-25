import express from 'express';
import orderController from '../controllers/orderController.js';
import authMiddleware from '../middlewear/authMiddlewear.js';

const router = express.Router();

router.use(authMiddleware.authenticateToken);

router.get('/my-orders', orderController.getMyOrders);

router
  .route('/')
  .get(authMiddleware.authorizeRoles(['admin']), orderController.getAllOrders)
  .post(orderController.createOrder);

router
  .route('/:id')
  .get(orderController.getOrderById)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

export default router;
