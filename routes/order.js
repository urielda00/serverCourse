import express from 'express';
import * as controllers from '../controllers/order.js';


const orderRouter = express.Router();

// place order
orderRouter.post('/placeOrder',controllers.placeOrder);

// get order
orderRouter.post('/getOrder',controllers.getOrder);

export default orderRouter;