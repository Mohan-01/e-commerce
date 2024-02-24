import express from 'express';
import authMiddleware from '../middlewear/authMiddlewear.js';
import userController from '../controllers/userController.js';

const router = express.Router();

router.get(
  '/',
  authMiddleware.authenticateToken,
  authMiddleware.authorizeRoles(['admin']),
  userController.getUsers
);

router
  .route('/:id')
  .get(authMiddleware.authenticateToken, userController.getUserById)
  .patch(authMiddleware.authenticateToken, userController.updateUser)
  .delete(authMiddleware.authenticateToken, userController.deleteUser);

export default router;
