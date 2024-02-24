import express from 'express';
import authController from '../controllers/authController.js';
import authMiddlewear from '../middlewear/authMiddlewear.js';

const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.get('/logout', authMiddlewear.authenticateToken, authController.logout);
router.post(
  '/update-password',
  authMiddlewear.authenticateToken,
  authController.passwordUpdate
);
router.post(
  '/reset-password',
  authMiddlewear.authenticateToken,
  authController.passwordReset
);
router.post(
  '/forget-password/:token',
  authMiddlewear.authenticateToken,
  authController.forgetPassword
);

export default router;
