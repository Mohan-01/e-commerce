import express from 'express';
import categoryController from '../controllers/categoryController.js';
// import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router
  .route('/')
  .get(
    // authMiddleware.authenticateUser,
    categoryController.getCategories
  )
  .post(
    // authMiddleware.authenticateUser,

    categoryController.createCategory
  );

router
  .route('/:id')
  .get(
    // authMiddleware.authenticateUser,
    categoryController.getCategoryById
  )
  .patch(
    // authMiddleware.authenticateUser,
    categoryController.updateCategory
  )
  .delete(
    // authMiddleware.authenticateUser,
    categoryController.deleteCategory
  );

export default router;
