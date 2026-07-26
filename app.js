import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import "./db.js"
import connectCloudinary from './cloudinay.js';

import indexRouter from './routes/index.js';
import userRouter from './routes/userRoutes.js';
import sellerRouter from './routes/sellerRoutes.js'
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import addressRoutes from './routes/addressRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
dotenv.config();

// Manually define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
await connectCloudinary()

// const allowedOrigin = [
//   "http://localhost:5173",        // for local dev
// const allowedOrigin = "https://shoppingapplicationfe.netlify.app";
const allowedOrigin = "https://shoppingappsdev.netlify.app/";

// const allowedOrigin = "http://localhost:5173";


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));
app.use(cookieParser());
// Routes
app.use('/', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/order', orderRoutes)



 // catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

export default app;
