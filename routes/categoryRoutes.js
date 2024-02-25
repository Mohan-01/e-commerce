import express from 'express';
import categoryController from '../controllers/categoryController.js';
import authMiddlewear from '../middlewear/authMiddlewear.js';

const router = express.Router();

router.get('/', categoryController.getCategories);

router.get(':/id', categoryController.getCategoryById);

router.use(authMiddlewear.authenticateToken);

router.post(
  '/',

  categoryController.createCategory
);
router
  .route('/:id')
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

export default router;
