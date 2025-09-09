import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { errorMiddleware } from './middleware/error.js';
import productRoute from './routes/product.route.js';

dotenv.config();

// Create Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});
app.use('/api/products', productRoute);

// Error Middleware
app.use(errorMiddleware);

export default app;
