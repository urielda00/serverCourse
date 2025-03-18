import express from 'express';
import * as controllers from '../controllers/product.js';

const productRouter = express.Router();


// create product
productRouter.post('/createProduct',controllers.createProduct);

// get product
productRouter.post('/getProduct',controllers.getProduct);

// delete product
productRouter.post('/deleteProduct',controllers.deleteProduct);


export default productRouter;