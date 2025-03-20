import express from 'express';
import * as controllers from '../controllers/product.js';
import preAuthUpload from '../middlewares/preAuthUpload.js';
import * as auth from '../middlewares/jwt.js';
import * as validation from '../middlewares/inputValidation.js';

const productRouter = express.Router();

// create product
productRouter.post(
	'/createProduct',
	auth.isAdmin,
	preAuthUpload.any(),
	validation.createProductValidation,
	validation.ValidationResult,
	controllers.createProduct
);

// get product
productRouter.post('/getProduct', controllers.getProduct);

// delete product
productRouter.post('/deleteProduct', auth.isAdmin, controllers.deleteProduct);

export default productRouter;
