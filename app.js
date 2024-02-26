import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import xss from 'xss-clean';
import hpp from 'hpp';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';

import categoryRouter from './routes/categoryRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import orderItemRouter from './routes/orderItemRoutes.js';
import cartItemRouter from './routes/cartItemRoutes.js';

const app = express();

const limiter = rateLimit({
  max: 24,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests, please try again in an hour!'
});

// Set security HTTP Headers
app.use(helmet());
app.use(
  cors(
    cors({
      origin: ['http://localhost:3000'],
      methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
      credentials: true
    })
  )
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(cookieParser());

app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: []
  })
);
app.use('/', limiter);
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
