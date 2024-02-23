import express from 'express';

import categoryRouter from './routes/categoryRoutes.js';
import productRouter from './routes/productRoutes.js';

const app = express();

// Middleware
app.use(express.json());

// routes
app.use('/categories', categoryRouter);
app.use('/products', productRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
