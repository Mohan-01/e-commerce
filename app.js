import express from 'express';
import cookieParser from 'cookie-parser';

import categoryRouter from './routes/categoryRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import orderItemRouter from './routes/orderItemRoutes.js';
import cartItemRouter from './routes/cartItemRoutes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/categories', categoryRouter);
app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/orders', orderRouter);
app.use('/order-items', orderItemRouter);
app.use('/cart-items', cartItemRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
