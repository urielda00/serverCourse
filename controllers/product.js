import saveNewImages from '../middlewares/upload.js';
import Product from '../models/Product.js';
import { productErrorLogger, productInfoLogger } from '../middlewares/logger.js';

// create product
export const createProduct = async (req, res) => {
	try {
		const { productName, description, price, quantity, status, company, releaseYear, category } = req.body;
		const uploadedRes = await saveNewImages(req);

		if (uploadedRes.files) {
			const newProduct = new Product({
				productName,
				description,
				price,
				quantity,
				status,
				company,
				releaseYear,
				category,
				productImages: uploadedRes.files,
			});
			await newProduct.save();
			res.status(201).json({ success: true, message: 'product created' });
			productInfoLogger.info('product created');
		} else {
			res.status(uploadedRes.status).json({ success: false, message: uploadedRes.message });
			productErrorLogger.error('Error creating product (in files)');
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
		productErrorLogger.error(error.message);
	}
};

// get product
export const getProduct = async (req, res) => {
	try {
		const { productId } = req.body;
		const product = await Product.findById(productId);
		if (!product) {
			res.status(404).json({ message: 'product not found', product: false });
			productErrorLogger.error('product not found');
		} else {
			res.status(200).json({ message: 'fetched product', product });
			productInfoLogger.info('fetched product');
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
		productErrorLogger.error(error.message);
	}
};

// delete product
export const deleteProduct = async (req, res) => {
	try {
		const { productId } = req.body;
		const product = await Product.findById(productId);
		if (!product) {
			res.status(404).json({ message: 'product not found' });
			productErrorLogger.error('product not found');
		} else {
			const changes = { status: 'unavailable' };
			const option = { new: true };
			await Product.findByIdAndUpdate(productId, changes, option);
			res.status(200).json({ message: 'the product deleted successfully' });
			productInfoLogger.info('the product deleted successfully');
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
		productErrorLogger.error(error.message);
	}
};
