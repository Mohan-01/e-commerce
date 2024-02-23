// routes/productRoutes.js

import express from 'express';
import productController from '../controllers/productController.js';

const router = express.Router();

router
  .route('/')
  .get(productController.getAllProductsController)
  .post(productController.createProductController);

router
  .route('/:id')
  .get(productController.getProductByIdController)
  .patch(productController.updateProductController)
  .delete(productController.deleteProductController);

export default router;
