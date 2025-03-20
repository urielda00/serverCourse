import express from 'express';
import * as controllers from '../controllers/product.js';
import preAuthUpload from '../middlewares/preAuthUpload.js';

const productRouter = express.Router();

// create product
productRouter.post('/createProduct', preAuthUpload.any(), controllers.createProduct);

// get product
productRouter.post('/getProduct', controllers.getProduct);

// delete product
productRouter.post('/deleteProduct', controllers.deleteProduct);

export default productRouter;
