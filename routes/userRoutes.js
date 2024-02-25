import express from 'express';
import authMiddleware from '../middlewear/authMiddlewear.js';
import userController from '../controllers/userController.js';

const router = express.Router();

router.use(authMiddleware.authenticateToken);

router.get(
  '/',
  authMiddleware.authorizeRoles(['admin']),
  userController.getUsers
);

router
  .route('/:id')
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default router;
