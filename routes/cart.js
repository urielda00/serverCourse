import express from 'express';
import * as controllers from '../controllers/cart.js';
import * as auth from '../middlewares/jwt.js';
import * as validation from '../middlewares/inputValidation.js';

const cartRouter = express.Router();

// add to cart
cartRouter.post('/addToCart', validation.addToCartValidation, validation.ValidationResult, controllers.addToCart);

// get cart
cartRouter.post('/getCart', controllers.getCart);

// remove from cart
cartRouter.post('/removeFromCart', validation.removeCartItemValidation, validation.ValidationResult, controllers.removeFromCart);

// delete cart
cartRouter.post('/deleteCart', auth.isAdmin, controllers.deleteCart);

export default cartRouter;
