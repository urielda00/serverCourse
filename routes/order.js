import express from 'express';
import * as controllers from '../controllers/order.js';
import * as validation from '../middlewares/inputValidation.js';

const orderRouter = express.Router();

// place order
orderRouter.post('/placeOrder', validation.placeOrderValidation, validation.ValidationResult, controllers.placeOrder);

// get order
orderRouter.post('/getOrder', controllers.getOrder);

export default orderRouter;
