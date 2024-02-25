import express from 'express';
import cartController from '../controllers/cartController.js';

const router = express.Router();

router
  .route('/')
  .get(cartController.getCartItems)
  .post(cartController.addToCart);
router.delete('/:id', cartController.removeFromCart);

export default router;
