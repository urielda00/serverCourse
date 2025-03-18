import express from 'express';
import * as controllers from '../controllers/cart.js';

const cartRouter = express.Router();

// add to cart
cartRouter.post('/addToCart',controllers.addToCart);

// get cart
cartRouter.post('/getCart',controllers.getCart);

// remove from cart
cartRouter.post('/removeFromCart',controllers.removeFromCart);

// delete cart
cartRouter.post('/deleteCart',controllers.deleteCart);


export default cartRouter;