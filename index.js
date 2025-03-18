import express from 'express';
import cartRouter from './routes/cart.js';
import orderRouter from './routes/order.js';
import productRouter from './routes/product.js';
import userRouter from './routes/user.js';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

// configuration
const app = express();
const port = 3000;
dotenv.config();

// routers
app.use('/user', userRouter);
app.use('/cart', cartRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);

// middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/uploads',express.static('uploads'));
app.use(express.urlencoded({limit:'30mb',extended:true}))
app.use(helmet.crossOriginResourcePolicy({policy:'cross-origin'}))

app.listen(port, () => {
	console.log(`the app is listening at port: ${port}`);
});
